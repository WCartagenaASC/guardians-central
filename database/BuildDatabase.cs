using Nett;
using Serilog;


class Program{
    static async Task Main(string[] args){        
        // Check if the command-line argument for the TOML file path is provided
        if (args.Length < 1){
            Console.WriteLine("Please provide a config path");
            return;
        }

        // Get the TOML file path from the command-line argument
        string tomlFilePath = args[0];

        // Check if the TOML file exists
        if (!File.Exists(tomlFilePath)){
            Console.WriteLine($"Error: The specified config file '{tomlFilePath}' does not exist.");
            return;
        }

        // Gets all the data from the TOML file
        var configFile = Toml.ReadFile(tomlFilePath);

        string LoggerPath = configFile.Get<string>("LoggerPath");
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.Console()
            .WriteTo.File($"{LoggerPath}Log_{DateTime.Now:yyyyMMdd_HHmmss}.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

        // Converts TOML File data to strings
        string BungieRootPath = configFile.Get<string>("BungieRootPath");
        string BungieApiRootPath = configFile.Get<string>("BungieAPIRootPath");
        string GetManifestEndpoint = configFile.Get<string>("GetManifestEndpoint");
        string DestinationFolderPath = configFile.Get<string>("DestinationFolderPath");
        string ManifestZipPath = configFile.Get<string>("ManifestZipPath");
        string ExtractionPath = configFile.Get<string>("ExtractionPath");
        string Sqlite3DbPath = configFile.Get<string>("Sqlite3DbPath");
        string Server = configFile.Get<string>("Server");
        string Database = configFile.Get<string>("Database");
        string UserId = configFile.Get<string>("UserId");
        string Password = configFile.Get<string>("Password");
        Log.Information(Server);
        Log.Information(Database);
        Log.Information(UserId);
        Log.Information(Sqlite3DbPath);

        // Gets the Manifest Endpoint
        string manifestEndpoint = "";
        try{
            manifestEndpoint = await ManifestEndpointRetrieval.GetManifestEndpoint(BungieApiRootPath, GetManifestEndpoint);
            Log.Information(manifestEndpoint);
        }catch(Exception ex){
            Log.Error(ex, "Failed to Get Manifest Endpoint");
        }

        // Recieves Manifest Endpoint and tries to download the manifest zip folder
        try{
            await ManifestZipDownloader.DownloadManifest(BungieRootPath:BungieRootPath, ManifestEndpoint:manifestEndpoint, DestinationFolderPath:DestinationFolderPath);
        }catch(Exception ex){
            Log.Error(ex, "Failed to Download Manifest");
        }

        try{
            ManifestFileExtractor.ExtractingManifest(ZipPath:ManifestZipPath, ExtractPath:ExtractionPath);
        }catch(Exception ex){
            Log.Error(ex, "Failed to Extract Manifest");
        }

        try{
            ExtensionChanger.ChangingFileExtension(ExtractPath:ExtractionPath);
        }catch(Exception ex){
            Log.Error(ex, "Failed to Change Manifest File Extension");
        }

        try{
            ManifestTableExtracter.DataMigration(Sqlite3DbPath:Sqlite3DbPath, Server:Server, Database:Database, UserId:UserId, Password:Password);
        }catch(Exception ex){
            Log.Error(ex, "Failed to Migrate Data");
        }

        Log.CloseAndFlush();  
    }
}