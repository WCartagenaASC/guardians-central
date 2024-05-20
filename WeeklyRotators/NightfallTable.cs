public class WeeklyRotatorsTable{
    public static void BuildNightfallTable(PublicMilestonesResponse.RootObject PublicMilestonesObject, string Server, string Database, string UserId, string Password){
        // Create SQL Server connection
        string sqlConnectionString = $"Server={Server};Database={Database};TrustServerCertificate=True;Uid={UserId};Pwd={Password};";

        string tableName = "NightfallTable";
        // Dictionary to store weekly rotator milestones
        Dictionary<string, PublicMilestonesResponse.Milestone> rawWeeklyRotatorsDictionary = new Dictionary<string, PublicMilestonesResponse.Milestone>();
    }
}