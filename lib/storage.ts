import fs from "fs";
import path from "path";

/**
 * Local-only file storage for development and production.
 * No AWS, no external dependencies, fully Turbopack-safe.
 */
export async function saveFileToStorage(file: File, key: string): Promise<string> {
  // Convert File → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Save inside /public/docs/... or whatever key you pass in
  const fullPath = path.join(process.cwd(), "public", key);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  // Write file to disk
  fs.writeFileSync(fullPath, buffer);

  // Return public URL
  return `/${key}`;
}
