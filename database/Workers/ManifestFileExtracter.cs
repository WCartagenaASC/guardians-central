// TO-DO
// Handle Exception File Already Exist
using System.IO.Compression;

public class ManifestFileExtractor{
    public static void ExtractingManifest(string ZipPath, string ExtractPath){
        string zipPath = ZipPath;
        string extractPath = ExtractPath;

        ZipFile.ExtractToDirectory(zipPath, extractPath);
    }
}