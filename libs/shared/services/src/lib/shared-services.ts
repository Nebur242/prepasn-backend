import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@prepa-sn/shared/config';
import { v4 as uuidv4 } from 'uuid';
import { Document } from '@prepa-sn/shared/interfaces';

// Initialize Firebase
export function getDatePath(date: Date): string {
  return (
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  );
}

export const uploadFileToFirebase = async (
  file: File
): Promise<Partial<Document>> => {
  const id = uuidv4();
  const fileRef = ref(
    storage,
    `documents/${getDatePath(new Date())}/${file.name}#${id}`
  );
  const snapshot = await uploadBytes(fileRef, file);
  console.log(snapshot);
  const publicUrl = await getDownloadURL(snapshot.ref);
  return {
    mimetype: snapshot.metadata.contentType,
    originalname: snapshot.metadata.name,
    size: snapshot.metadata.size,
    encoding: snapshot.metadata.contentEncoding,
    fieldname: snapshot.metadata.fullPath,
    filename: snapshot.metadata.name,
    title: snapshot.metadata.name,
    publicUrl,
  };
};

export const uploadFilesToFirebase = (
  files: File[]
): Promise<Partial<Document>[]> => {
  return Promise.all(files.map((file) => uploadFileToFirebase(file)));
};
