import { googleDriveConfig } from "../configs/google";
import { driveService } from "../services/googleDrive.service";
import { extractCSVFromZip, parseCSV } from "../utils/util";

export async function fetchLatestCsvAsJson() {
  const folderId = googleDriveConfig.folderId;

  const latestFile = await driveService.getLatestZipFile(folderId);
  if (!latestFile?.id) {
    throw new Error("No zip file found in the specified folder.");
  }

  const zipData = await driveService.downloadFile(latestFile.id);
  const csvContent = extractCSVFromZip(zipData);

  if (!csvContent) {
    throw new Error("No CSV file found inside the ZIP archive.");
  }

  const parsedData = parseCSV(csvContent);
  return parsedData;
}
