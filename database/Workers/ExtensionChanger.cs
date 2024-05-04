using Serilog;

public class ExtensionChanger{
    public static void ChangingFileExtension(string ExtractPath){
        // Get a list of all files in the extraction directory
        string[] files = Directory.GetFiles(ExtractPath);

        foreach (var filePath in files){
            string fileName = Path.GetFileName(filePath);
            string newFileName = "Sqlite3Destiny2DB" + ".sqlite3";
            string newFilePath = Path.Combine(ExtractPath, newFileName);

            try{
                File.Move(filePath, newFilePath);
                Log.Information("File successfully moved");
            }catch (IOException ex){
                if (ex.Message.Contains("Cannot create a file when that file already exists")){
                    // Handle the case where the file already exists
                    Log.Error($"File {newFileName} already exists. Deleting and retrying.");

                    // Delete the existing file
                    File.Delete(newFilePath);

                    // Retry renaming
                    File.Move(filePath, newFilePath);

                    Log.Information($"File {fileName} renamed to {newFileName}");
                }else{
                    // Handle other IOExceptions
                    Log.Information($"Error renaming file {fileName}: {ex.Message}");
                }
            }
        }
    }
}