using Serilog;
using Newtonsoft.Json;

public class PublicMilestonesResponse{
    public class RootObject{
        public Dictionary<string, Milestone>? Response { get; set; }
        public int? ErrorCode { get; set; }
        public int? ThrottleSeconds { get; set; }
        public string? ErrorStatus { get; set; }
        public string? Message { get; set; }
        public Dictionary<string, object>? MessageData { get; set; }
    }
    public class Milestone{
        [JsonProperty("milestoneHash")]
        public long MilestoneHash { get; set; }

        [JsonProperty("availableQuests")]
        public List<QuestItem>? AvailableQuests { get; set; }

        [JsonProperty("activities")]
        public List<Activity>? Activities { get; set; }

        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty("endDate")]
        public DateTime EndDate { get; set; }

        [JsonProperty("order")]
        public int Order { get; set; }
    }
    public class Activity{
        [JsonProperty("activityHash")]
        public long ActivityHash { get; set; }

        [JsonProperty("challengeObjectiveHashes")]
        public List<long>? ChallengeObjectiveHashes { get; set; }

        [JsonProperty("modifierHashes")]
        public List<long>? ModifierHashes { get; set; }

        [JsonProperty("phaseHashes")]
        public List<long>? PhaseHashes { get; set; }

        [JsonProperty("booleanActivityOptions")]
        public Dictionary<string, bool>? BooleanActivityOptions { get; set; }
    }

    public class QuestItem{
        [JsonProperty("questItemHash")]
        public long QuestItemHash { get; set; }
    }
}

public class BungieApiRequests{
    public static async Task <PublicMilestonesResponse.RootObject> GetPublicMilestonesRequest(string BungieRootPath, string GetPublicMilestoneEndpoint, string GuardiansCentralApiKey){

        using (HttpClient httpClient = new HttpClient()){
            try{
                string publicMilestonesUrl = BungieRootPath + GetPublicMilestoneEndpoint;
                httpClient.DefaultRequestHeaders.Add("x-api-key", GuardiansCentralApiKey);
                HttpResponseMessage publicMilestoneResponse = await httpClient.GetAsync(publicMilestonesUrl);

                //Converts publicMilestoneResponse to a string
                string  publicMilestoneResponseAsString = await publicMilestoneResponse.Content.ReadAsStringAsync();

                // Deserailizes publicMilestoneResponse and builds a C# Object from it using Newtonsoft Json
                var publicMilestonesObject = JsonConvert.DeserializeObject<PublicMilestonesResponse.RootObject>(publicMilestoneResponseAsString);

                if (publicMilestonesObject != null){
                    return publicMilestonesObject;
                }else{
                    throw new ApplicationException("The Public Milestone Object is null");
                }

            }catch{
                throw new ApplicationException("Unable to get public milestones");
            }

        }
    }
}


                //Console.WriteLine(JsonConvert.SerializeObject(publicMilestonesObject.Response["213479068"]));
                // Serializes publicMilestonesObject to Json
                //string publicMilestoneJson = JsonConvert.SerializeObject(publicMilestonesObject);
                //Console.WriteLine(publicMilestonesObject.Response);