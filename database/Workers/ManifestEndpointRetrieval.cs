using System.Text.Json;
using Serilog;

public class ManifestResponse{
    public class mobileWorldContentPaths{
        public string? en { get; set; }
    }

    public class ResponseData{
        public mobileWorldContentPaths? mobileWorldContentPaths { get; set; }
    }

    public class RootObject{
        public ResponseData? Response { get; set; }
        public string? ErrorStatus { get; set; }
    }
}
public class ManifestEndpointRetrieval{
        public static async Task <string> GetManifestEndpoint(string BungieApiRootPath, string GetManifestEndpoint){
        // Builds Manifest URL
        string getManifestURL = BungieApiRootPath + GetManifestEndpoint;

        using (HttpClient httpClient = new HttpClient()){
            try{
                // API Call for manifest URL
                HttpResponseMessage getManifestResponse = await httpClient.GetAsync(getManifestURL);

                // Checks if HTTP Request was sucessfull
                if (getManifestResponse.IsSuccessStatusCode){
                    //Converts ManifestResonse to a String
                    string manifestResponseAsString = await getManifestResponse.Content.ReadAsStringAsync();

                    // Deserailizes manifest Response and build a C# Object from it
                    ManifestResponse.RootObject? manifestResponse = JsonSerializer.Deserialize<ManifestResponse.RootObject>(manifestResponseAsString);

                    // Access and return the Manifest Endpoint
                    // This if statement should be refactored to check status messages not whether or not a variable is null
                    if (manifestResponse != null && manifestResponse.Response != null && manifestResponse.Response.mobileWorldContentPaths != null){
                        string englishManifestEndpoint = manifestResponse.Response!.mobileWorldContentPaths!.en!;
                        return englishManifestEndpoint;
                    }else{
                        throw new ApplicationException("Unable to retrieve MobileWorldContentPaths.");// Not Tested
                    }

                }else{
                    throw new ApplicationException($"HTTP Status Code: {getManifestResponse.StatusCode}");// Not Tested
                }
            }catch (HttpRequestException ex){
                Log.Error($"Error: {ex.Message}");
                return ex.Message;
            }
        }
    }
}