import { unzipSync } from "fflate";
import Papa from "papaparse";

export function extractCSVFromZip(zipData: Uint8Array): string | null {
  const files = unzipSync(zipData);
  const csvEntry = Object.entries(files).find(([name]) =>
    name.endsWith(".csv")
  );

  if (!csvEntry) return null;

  const [, data] = csvEntry;
  return new TextDecoder().decode(data);
}

export function parseCSV(csvText: string): Record<string, any>[] {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data as Record<string, any>[];
}
