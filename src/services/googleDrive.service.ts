import { google } from "googleapis";

export class GoogleDriveService {
  private driveClient;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "service-account.json",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    this.driveClient = google.drive({
      version: "v3",
      auth,
    });
  }

  async getLatestZipFile(folderId: string) {
    const res = await this.driveClient.files.list({
      q: `'${folderId}' in parents and mimeType='application/zip'`,
      fields: "files(id, name, createdTime)",
      orderBy: "createdTime desc",
      pageSize: 1,
    });

    return res.data.files?.[0] ?? null;
  }

  async downloadFile(fileId: string): Promise<Uint8Array> {
    const res = await this.driveClient.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );
    return new Uint8Array(res.data as ArrayBuffer);
  }
}

// Optional Singleton instance
export const driveService = new GoogleDriveService();
