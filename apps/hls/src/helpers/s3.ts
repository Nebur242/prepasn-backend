import { S3Event } from 'aws-lambda';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createReadStream, readdirSync, statSync } from 'fs';
import { REGION } from '../app/constants';
import path from 'path';

const s3Client = new S3Client({ region: REGION });

export function getSourceFromS3(event: S3Event) {
  const { s3: s3EventRecord } = event.Records[0];
  const command = new GetObjectCommand({
    Bucket: s3EventRecord.bucket.name,
    Key: decodeURIComponent(s3EventRecord.object.key).replace(/\+/g, ' '),
  });
  return getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 3 });
}

const walkSync = (
  currentDirPath: string,
  callback: (filepath: string) => void
) => {
  readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      callback(filePath);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
};

function sanitize(path: string) {
  return path.replace(/^\/|\/$/g, '');
}

export async function uploadToS3(path: string, bucket: string, dstKey: string) {
  if (statSync(path).isFile()) {
    console.log('Uploading to s3', {
      Bucket: sanitize(bucket),
      Key: sanitize(dstKey),
    });
    return s3Client.send(
      new PutObjectCommand({
        Bucket: sanitize(bucket),
        Key: sanitize(dstKey),
        Body: createReadStream(path),
      })
    );
  }

  const files: string[] = [];
  walkSync(path, (filepath) => files.push(filepath));

  for (const file of files) {
    console.log('Uploading to s3', {
      Bucket: sanitize(bucket),
      Key: `${sanitize(dstKey)}/${sanitize(file.replace(path, ''))}`,
    });
    await s3Client.send(
      new PutObjectCommand({
        Bucket: sanitize(bucket),
        Key: `${sanitize(dstKey)}/${sanitize(file.replace(path, ''))}`,
        Body: createReadStream(file),
      })
    );
    console.log(
      `Successfully uploaded ${`${sanitize(dstKey)}/${sanitize(
        file.replace(path, '')
      )}`} to s3 bucket`
    );
  }
}
