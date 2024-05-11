using Microsoft.Data.SqlClient;
using System.Text;
using Serilog;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

public class MilestoneDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }

    public class Activity{
        public long? activityHash { get; set; }
    }

    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public string? friendlyName { get; set; }
        public Activity[]? activities { get; set; }
        public long? hash { get; set; }
        public long? index { get; set; }
        public bool? redacted { get; set; }
        public bool? blacklisted { get; set; }
    }
}

public class CollectibleDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public long itemHash { get; set; }
    }
}

public class ActivityDefinitionJson{
    public class OriginalDisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }

    public class Root{
        public OriginalDisplayProperties? originalDisplayProperties { get; set; }
        public string? pgcrImage { get; set; }
        public long? hash { get; set; }
        public int activityTypeHash { get; set; }    
    }

}

public class ActivityTypeDefinitionJson{
    public class DisplayProperties{
        public string? name { get; set; }
    }
    
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
    }
}

public class InventoryItemDefinitionJson{
    public class DisplayProperties{
        public string? description { get; set; }
        public string? name { get; set; }
        public string? icon { get; set; }
        public bool? hasIcon { get; set; }
    }

    public class Inventory{
        public long? tierTypeHash { get; set; }
        public string? tierTypeName { get; set; }
    }
    public class SocketEntries{
        public long? socketTypeHash { get; set; }
        public long? singleInitialItemHash { get; set; }
    }
    public class Sockets{
        public SocketEntries[]? socketEntries { get; set; }
    }

    public class Stat{
        public long statHash { get; set; }
        public int value { get; set; }
        public int minimum { get; set; }
        public int maximum { get; set; }
        public int displayMaximum { get; set; }
    }
    public class Stats{
        public Dictionary<long, Stat> stats { get; set; }
    }
    public class Root{
        public DisplayProperties? displayProperties { get; set; }
        public long[]? itemCategoryHashes { get; set; }
        public long[]? damageTypeHashes { get; set; }
        public string screenshot { get; set; }
        public string itemTypeDisplayName { get; set; }
        public string flavorText { get; set; }
        public string itemTypeAndTierDisplayName { get; set; }
        public Inventory? inventory { get; set; }
        public Sockets? sockets { get; set; }
        public Stats? stats { get; set; }
    }
}
public class DamageTypeMapping{
    public Dictionary<int, (string Icon, string Name)> Mapping { get; }

    public DamageTypeMapping(){
        Mapping = new Dictionary<int, (string Icon, string Name)>
        {
            { unchecked((int)3373582085), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png", "Kinetic") },
            { unchecked((int)1847026933), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png", "Solar") },
            { unchecked((int)2303181850), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png", "Arc") },
            { unchecked((int)3454344768), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png", "Void") },
            { unchecked((int)151347233), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png", "Stasis") },
            { unchecked((int)3949783978), ("/common/destiny2_content/icons/DestinyDamageTypeDefinition_b2fe51a94f3533f97079dfa0d27a4096.png", "Strand") }
        };
    }
}

public class WeeklyRotatorsTable{
    public static void BuildWeeklyRotatorsTable(PublicMilestonesResponse.RootObject PublicMilestonesObject, string Server, string Database, string UserId, string Password){
        // Create MS SQL Server connection
        string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";
        Log.Information(sqlConnectionString);
        string tableName = "WeeklyRotatorsTable";
        // Dictionary to store weekly rotator milestones
        Dictionary<string, PublicMilestonesResponse.Milestone> rawWeeklyRotatorsDictionary = new Dictionary<string, PublicMilestonesResponse.Milestone>();

        // Loops through all milestones and checks for the 3 Weekly Rotators and adds them to a list
        if (PublicMilestonesObject.Response != null) {
            foreach (KeyValuePair<string, PublicMilestonesResponse.Milestone> milestoneKVP in PublicMilestonesObject.Response){
                if (milestoneKVP.Value.Activities != null) {
                    foreach (PublicMilestonesResponse.Activity activity in milestoneKVP.Value.Activities){
                        if(activity.ChallengeObjectiveHashes != null){
                            if(activity.ChallengeObjectiveHashes.Count > 0){ 
                                // Check if the key exist already if it does do not add it. This will eliminate the Legend versions from the dict
                                if (!rawWeeklyRotatorsDictionary.ContainsKey(milestoneKVP.Key)){
                                    // Create a new dictionary to hold the milestone
                                    rawWeeklyRotatorsDictionary.Add(milestoneKVP.Key, milestoneKVP.Value);
                                }
                            }
                        }
                    }
                }

            }
        } else {
            Log.Warning("PublicMilestonesObject.Response is null. Unable to iterate through milestones.");
            throw new ApplicationException("PublicMilestonesObject.Response is null. Unable to iterate through milestones.");
        }


        long? activityId = null;
        long? activityTypeId = null;
        string? activityName = null;
        long? milestoneHash = null;
        long? milestoneHashInTable = null;
        List<Dictionary<string, object>> weapons = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> hunterArmor = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> warlockArmor = new List<Dictionary<string, object>>();
        List<Dictionary<string, object>> titanArmor = new List<Dictionary<string, object>>();
        using (SqlConnection msSqlConnection = new SqlConnection(sqlConnectionString)){
            try{
                msSqlConnection.Open();
                bool doesTableExist = TableExists(connection:msSqlConnection, tableName:tableName);
                if(doesTableExist == false){
                    Log.Information($"{tableName} not found");
                    using (SqlCommand createTableCommand = new SqlCommand($"CREATE TABLE {tableName} (MilestoneHash BIGINT, Json VARCHAR(MAX))", msSqlConnection)) {
                        createTableCommand.ExecuteNonQuery();
                    }
                }
                // Empty dictionary to add table information to
                Dictionary<string, object> weeklyRotatorTableJson = new Dictionary<string, object>();
                foreach(KeyValuePair<string, PublicMilestonesResponse.Milestone> weeklyRotatorKVP in rawWeeklyRotatorsDictionary){
                    weapons.Clear();
                    hunterArmor.Clear();
                    warlockArmor.Clear();
                    titanArmor.Clear();
                    weeklyRotatorTableJson.Clear();
                    var milestoneId = unchecked((int) weeklyRotatorKVP.Value.MilestoneHash);
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyMilestoneDefinition Where Id = {milestoneId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                // Log the response using Serilog
                                Log.Information("SQL Query Response: {@Response}", new{
                                    LogId = reader["Id"],
                                    LogJson = reader["json"].ToString(),
                                });
                                string? milestoneDefinitionJson = reader["json"].ToString();
                                MilestoneDefinitionJson.Root? milestoneDefinitionRoot = null;
                                if (milestoneDefinitionJson != null) {
                                    milestoneDefinitionRoot = JsonConvert.DeserializeObject<MilestoneDefinitionJson.Root>(milestoneDefinitionJson);
                                } else {
                                    Log.Warning("milestoneDefinitionJson is null. Unable to deserialize.");
                                }
                                milestoneHash = milestoneDefinitionRoot?.hash;
                                long? activityHash = null;
                                if (milestoneDefinitionRoot != null && milestoneDefinitionRoot.activities != null && milestoneDefinitionRoot.activities.Length > 0) {
                                    activityHash = milestoneDefinitionRoot?.activities[0].activityHash;
                                }

                                if(activityHash != null) {
                                    activityId =  unchecked((int) activityHash);
                                }
                                
                                string? iconUrl = milestoneDefinitionRoot?.displayProperties?.icon;
                                if (iconUrl != null) {
                                    weeklyRotatorTableJson.Add("iconUrl", iconUrl);
                                }
                            }
                        }
                    }

                    using (SqlCommand checkIfRowExistCommand = new SqlCommand($"SELECT * FROM {tableName} Where MilestoneHash = {milestoneHash}", msSqlConnection)){
                          using (SqlDataReader rowExistreader = checkIfRowExistCommand.ExecuteReader()){
                            while (rowExistreader.Read()){
                                milestoneHashInTable = rowExistreader["MilestoneHash"] as long?;
                            }
                        }
                    }

                    if(milestoneHash == milestoneHashInTable){
                        Log.Information($"{milestoneHash} is already in table");
                        continue;
                    }

                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyActivityDefinition Where Id = {activityId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string? activityDefinitionJson = reader["json"].ToString();
                                ActivityDefinitionJson.Root? activityDefinitionRoot = null;
                                if(activityDefinitionJson != null){
                                    activityDefinitionRoot = JsonConvert.DeserializeObject<ActivityDefinitionJson.Root>(activityDefinitionJson);
                                }
                                activityName = activityDefinitionRoot?.originalDisplayProperties?.name;
                                activityName = activityName?.Replace(":", "");
                                string? pgcrImage = activityDefinitionRoot?.pgcrImage;
                                int? activityTypeHash = activityDefinitionRoot?.activityTypeHash;
                                if(activityTypeHash != null){
                                    activityTypeId = unchecked((int) activityTypeHash);
                                }
                                if(activityName != null){
                                    weeklyRotatorTableJson.Add("activityName",activityName);
                                }
                                if(pgcrImage != null){
                                    weeklyRotatorTableJson.Add("pcgrImage",pgcrImage);
                                }
                            }
                        }
                    }
                    
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyActivityTypeDefinition Where Id = {activityTypeId}", msSqlConnection)){
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string? activityTypeDefinitionJson = reader["json"].ToString();
                                ActivityTypeDefinitionJson.Root? activityTypeDefinitionRoot = null;
                                if(activityTypeDefinitionJson != null){
                                    activityTypeDefinitionRoot = JsonConvert.DeserializeObject<ActivityTypeDefinitionJson.Root>(activityTypeDefinitionJson);
                                }
                                string? activityType = activityTypeDefinitionRoot?.displayProperties?.name;
                                if(activityType != null){
                                    weeklyRotatorTableJson.Add("activityType", activityType);
                                }
                            }
                        }

                    }
                    List<long> inventoryItemIdList = new List<long>();
                    using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyCollectibleDefinition WHERE Json LIKE @activityName", msSqlConnection)){
                        sqlCommand.Parameters.AddWithValue("@activityName", "%" + activityName + "%");
                        using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                            while (reader.Read()){
                                string? collectibleDefinitionJson = reader["json"].ToString();
                                CollectibleDefinitionJson.Root? collectibleDefinitionRoot = null;
                                if(collectibleDefinitionJson != null){
                                    collectibleDefinitionRoot = JsonConvert.DeserializeObject<CollectibleDefinitionJson.Root>(collectibleDefinitionJson)!;
                                }
                                long? collectibleItemHash = collectibleDefinitionRoot?.itemHash;
                                long inventoryItemId = unchecked((int) collectibleItemHash);
                                inventoryItemIdList.Add(inventoryItemId);
                            }
                        }
                    }
                    List<long> inventoryItemIntrinsicTraitList = new List<long>();
                    foreach(long itemId in inventoryItemIdList){
                        inventoryItemIntrinsicTraitList.Clear();
                        string inventoryItemName = "";
                        string inventoryItemIcon = "";
                        string inventoryItemScreenShot = "";
                        string inventoryItemTypeAndTierDisplayName =  "";
                        string inventoryItemTierTypeName = "";
                        string inventoryItemIsCraftable = "";
                        string inventoryItemType = "";
                        string damageTypeIcon = "";
                        string damageTypeName = "";
                        string inventoryItemRpmStat = "";
                        using (SqlCommand sqlCommand = new SqlCommand($"SELECT * FROM DestinyInventoryItemDefinition WHERE Id = {itemId}", msSqlConnection)){
                            using (SqlDataReader reader = sqlCommand.ExecuteReader()){
                                while (reader.Read()){
                                    string? inventoryItemDefinitionJson = reader["json"].ToString();
                                    InventoryItemDefinitionJson.Root? inventoryItemDefinitionRoot = null;
                                    if (inventoryItemDefinitionJson != null){
                                        inventoryItemDefinitionRoot = JsonConvert.DeserializeObject<InventoryItemDefinitionJson.Root>(inventoryItemDefinitionJson);
                                    }
                                    if (inventoryItemDefinitionRoot != null){
                                        inventoryItemName = inventoryItemDefinitionRoot.displayProperties?.name ?? "";
                                        inventoryItemIcon = inventoryItemDefinitionRoot.displayProperties?.icon ?? "";
                                        inventoryItemScreenShot = inventoryItemDefinitionRoot.screenshot ?? "";
                                        inventoryItemTypeAndTierDisplayName = inventoryItemDefinitionRoot.itemTypeAndTierDisplayName ?? "";
                                        inventoryItemTierTypeName = inventoryItemDefinitionRoot.inventory?.tierTypeName ?? "";
                                        inventoryItemIsCraftable = "false";
                                        if (inventoryItemDefinitionRoot.sockets?.socketEntries != null){
                                            foreach (var socketEntry in inventoryItemDefinitionRoot.sockets.socketEntries){
                                                if (socketEntry.singleInitialItemHash == 1961918267){ // 1961918267 is a Empty DeepSight Socket Hash
                                                    inventoryItemIsCraftable = "true";
                                                }
                                                if (socketEntry.socketTypeHash == 3956125808){ // Is the Intrinsic Trait Socket Hash
                                                    if (socketEntry.singleInitialItemHash.HasValue) { // Check if the value is not null
                                                        long socketTypeId = unchecked((int) socketEntry.singleInitialItemHash);
                                                        inventoryItemIntrinsicTraitList.Add(socketTypeId); // Add the non-null value
                                                    }
                                                }
                                            }
                                        }
                                        int inventoryDamageTypeHash = -1;
                                        // Checks if the array is null and sets it to an impossible hash if it is
                                        if (inventoryItemDefinitionRoot.damageTypeHashes != null && inventoryItemDefinitionRoot.damageTypeHashes.Length > 0){
                                            inventoryDamageTypeHash = (int)inventoryItemDefinitionRoot.damageTypeHashes[0];
                                        }
                                        //Checks the mapping to set variables
                                        var mapping = new DamageTypeMapping();
                                        if(mapping.Mapping.TryGetValue(inventoryDamageTypeHash, out var result)){
                                            damageTypeIcon = result.Icon;
                                            damageTypeName = result.Name;
                                        }
                                        if (inventoryItemDefinitionRoot.stats != null && inventoryItemDefinitionRoot.stats.stats != null){
                                            foreach(var kvp in inventoryItemDefinitionRoot.stats.stats) {
                                                if (kvp.Key.Equals(4284893193)) {
                                                    inventoryItemRpmStat = kvp.Value.value.ToString();
                                                }
                                            }
                                        }
                                                            
                                        if (inventoryItemDefinitionRoot.itemCategoryHashes?.Contains(22) == true && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                            inventoryItemType = "TitanArmor";
                                        } else if (inventoryItemDefinitionRoot.itemCategoryHashes?.Contains(23) == true && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                            inventoryItemType = "HunterArmor";
                                        } else if (inventoryItemDefinitionRoot.itemCategoryHashes?.Contains(21) == true && inventoryItemDefinitionRoot.itemCategoryHashes.Contains(20)){
                                            inventoryItemType = "WarlockArmor";
                                        } else if (inventoryItemDefinitionRoot.itemCategoryHashes?.Contains(1) == true){
                                            inventoryItemType = "Weapon";
                                        }
                                    }
                                }
                            }
                        }
                        Dictionary<string, object> itemObject = new Dictionary<string, object>();
                        Dictionary<string, string> innerDictionary = new Dictionary<string, string>{
                            { "name", inventoryItemName },
                            { "icon", inventoryItemIcon },
                            { "screenshot", inventoryItemScreenShot },
                            { "inventoryTypeAndTierDisplayName", inventoryItemTypeAndTierDisplayName },
                            { "inventoryTierTypeName", inventoryItemTierTypeName },
                            { "damageTypeName", damageTypeName },
                            { "damageTypeIcon", damageTypeIcon },
                            { "isCraftable", inventoryItemIsCraftable},
                            { "rpmStat", inventoryItemRpmStat}
                        };

                        string inventoryItemFrameName = "";
                        string inventoryItemFrameDescription = "";
                        string inventoryItemFrameIcon = "";
                        if(inventoryItemIntrinsicTraitList.Count > 0){
                            using (SqlCommand findFrameInfo = new SqlCommand($"SELECT * FROM DestinyInventoryItemDefinition WHERE Id = {inventoryItemIntrinsicTraitList[0]}", msSqlConnection)){
                                using (SqlDataReader findFrameInfoReader = findFrameInfo.ExecuteReader()){
                                    while (findFrameInfoReader.Read()){
                                        string? inventoryItemDefinitionJson = findFrameInfoReader["json"].ToString();
                                        InventoryItemDefinitionJson.Root? inventoryItemDefinitionRoot = null;
                                        if (inventoryItemDefinitionJson != null){
                                            inventoryItemDefinitionRoot = JsonConvert.DeserializeObject<InventoryItemDefinitionJson.Root>(inventoryItemDefinitionJson);
                                        }
                                        inventoryItemFrameName = inventoryItemDefinitionRoot.displayProperties?.name ?? "";
                                        inventoryItemFrameDescription = inventoryItemDefinitionRoot.displayProperties?.description ?? "";
                                        inventoryItemFrameIcon = inventoryItemDefinitionRoot.displayProperties?.icon ?? "";
                                    }
                                }
                            }
                        }
                        // Modify the itemObject dictionary to include frame info
                        innerDictionary.Add("frameName", inventoryItemFrameName);
                        innerDictionary.Add("frameDescription", inventoryItemFrameDescription);
                        innerDictionary.Add("frameIcon", inventoryItemFrameIcon);

                        if (inventoryItemType == "TitanArmor" || inventoryItemType == "HunterArmor" || inventoryItemType == "WarlockArmor"){
                            if (innerDictionary.ContainsKey("isCraftable")){
                                innerDictionary.Remove("isCraftable");
                            }
                            if (innerDictionary.ContainsKey("damageTypeIcon")){
                                innerDictionary.Remove("damageTypeIcon");
                            }
                            if (innerDictionary.ContainsKey("damageTypeName")){
                                innerDictionary.Remove("damageTypeName");
                            }
                            if (innerDictionary.ContainsKey("frameName")){
                                innerDictionary.Remove("frameName");
                            }
                            if (innerDictionary.ContainsKey("frameDescription")){
                                innerDictionary.Remove("frameDescription");
                            }
                            if (innerDictionary.ContainsKey("frameIcon")){
                                innerDictionary.Remove("frameIcon");
                            }
                            if (innerDictionary.ContainsKey("rpmStat")){
                                innerDictionary.Remove("rpmStat");
                            }
                        }
                        itemObject.Add(inventoryItemName, innerDictionary);
                        if (inventoryItemType != null){
                            switch (inventoryItemType){
                            case "TitanArmor":
                                int titanIndex = 0;
                                if (inventoryItemTypeAndTierDisplayName.Contains("Helmet"))
                                {
                                    titanIndex = Math.Min(0, titanArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Gauntlets"))
                                {
                                    titanIndex = Math.Min(1, titanArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Chest Armor"))
                                {
                                    titanIndex = Math.Min(2, titanArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Leg Armor"))
                                {
                                    titanIndex = Math.Min(3, titanArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Mark"))
                                {
                                    titanIndex = Math.Min(4, titanArmor.Count);
                                }
                                titanArmor.Insert(titanIndex, itemObject);
                                break;
                            case "HunterArmor":
                                int hunterIndex = 0;
                                if (inventoryItemTypeAndTierDisplayName.Contains("Helmet"))
                                {
                                    hunterIndex = Math.Min(0, hunterArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Gauntlets"))
                                {
                                    hunterIndex = Math.Min(1, hunterArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Chest Armor"))
                                {
                                    hunterIndex = Math.Min(2, hunterArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Leg Armor"))
                                {
                                    hunterIndex = Math.Min(3, hunterArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Cloak"))
                                {
                                    hunterIndex = Math.Min(4, hunterArmor.Count);
                                }
                                hunterArmor.Insert(hunterIndex, itemObject);
                                break;
                            case "WarlockArmor":
                                int warlockIndex = 0;
                                if (inventoryItemTypeAndTierDisplayName.Contains("Helmet"))
                                {
                                    warlockIndex = Math.Min(0, warlockArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Gauntlets"))
                                {
                                    warlockIndex = Math.Min(1, warlockArmor.Count); // Ensure index is within bounds
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Chest Armor"))
                                {
                                    warlockIndex = Math.Min(2, warlockArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Leg Armor"))
                                {
                                    warlockIndex = Math.Min(3, warlockArmor.Count);
                                }
                                else if (inventoryItemTypeAndTierDisplayName.Contains("Bond"))
                                {
                                    warlockIndex = Math.Min(4, warlockArmor.Count);
                                }
                                warlockArmor.Add(itemObject);
                                break;
                            case "Weapon":
                                if(inventoryItemTierTypeName.Contains("Exotic")){
                                    weapons.Insert(0, itemObject);
                                }else{ 
                                    weapons.Add(itemObject);
                                }
                                break;
                            }
                        }
                    }
                    weeklyRotatorTableJson.Add("titanArmor", titanArmor);
                    weeklyRotatorTableJson.Add("hunterArmor", hunterArmor);
                    weeklyRotatorTableJson.Add("warlockArmor", warlockArmor);
                    weeklyRotatorTableJson.Add("weapons", weapons);      
                    string jsonString = JsonConvert.SerializeObject(weeklyRotatorTableJson);
                    using (SqlCommand insertRowCommand = new SqlCommand($"INSERT INTO {tableName} (MilestoneHash, Json) VALUES (@MilestoneHash, @Json)", msSqlConnection)){
                        // Set parameter values and execute query
                        insertRowCommand.Parameters.AddWithValue("@MilestoneHash", milestoneHash);
                        insertRowCommand.Parameters.AddWithValue("@Json", jsonString);
                        insertRowCommand.ExecuteNonQuery();
                    }
                    Console.WriteLine(jsonString);
                }

            }catch (Exception ex){
                Log.Error($"Error opening MySQL connection: {ex.Message}");
            }
        }

    }
    private static bool TableExists(SqlConnection connection, string tableName) {
        using (SqlCommand command = new SqlCommand($"SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{tableName}'", connection)) {
            return command.ExecuteScalar() != null;
        }
    }

}

// Item Categories
// Titan 22
// Hunter 23
// Warlock 21
// Armor 20
// Weapon 1


//Damage Type Hashes
// Kinetic
// Solar