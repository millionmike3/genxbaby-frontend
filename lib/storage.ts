import fs from "fs";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * Detect environment:
 * - LOCAL: store files in /public/uploads
 * - PROD: store files in S3-compatible storage
 */
const USE_S3 =
  process.env.STORAGE_DRIVER === "s3" ||
  (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

let s3: S3Client | null = null;

if (USE_S3) {
  s3 = new S3Client({
    region: process.env.AWS_REGION ?? "us-east-1",
    endpoint: process.env.AWS_ENDPOINT ?? undefined, // optional for MinIO / DO Spaces
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Save file to local filesystem
 */
async function saveLocalFile(file: File, filePath: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const fullPath = path.join(process.cwd(), "public", filePath);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  // Write file
  fs.writeFileSync(fullPath, buffer);

  // Public URL
  return `/${filePath}`;
}

/**
 * Save file to S3 or compatible storage
 */
async function saveS3File(file: File, key: string): Promise<string> {
  if (!s3) throw new Error("S3 client not initialized");

  const buffer = Buffer.from(await file.arrayBuffer());

  const bucket = process.env.AWS_BUCKET!;
  const endpoint = process.env.AWS_PUBLIC_URL ?? null;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  // Public URL
  if (endpoint) {
    return `${endpoint}/${key}`;
  }

  // Default AWS URL
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}

/**
 * Main storage function used by your upload API
 */
export async function saveFileToStorage(
  file: File,
  key: string
): Promise<string> {
  if (!USE_S3) {
    // Local mode
    return saveLocalFile(file, key);
  }

  // S3 mode
  return saveS3File(file, key);
}
