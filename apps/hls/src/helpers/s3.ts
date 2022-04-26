import { S3Event } from 'aws-lambda';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createReadStream } from 'fs';
import { REGION } from '../app/constants';

const s3Client = new S3Client({ region: REGION });

export function getSourceFromS3(event: S3Event) {
  const { s3: s3EventRecord } = event.Records[0];
  const command = new GetObjectCommand({
    Bucket: s3EventRecord.bucket.name,
    Key: decodeURIComponent(s3EventRecord.object.key).replace(/\+/g, ' '),
  });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function uploadToS3(
  filepath: string,
  bucket: string,
  dstKey: string
) {
  return s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: dstKey,
      Body: createReadStream(filepath),
    })
  );
}
