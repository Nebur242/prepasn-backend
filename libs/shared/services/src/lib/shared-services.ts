import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
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
  const publicUrl = await getDownloadURL(snapshot.ref);
  return {
    mimetype: snapshot.metadata.contentType,
    originalname: file.name,
    size: snapshot.metadata.size,
    encoding: snapshot.metadata.contentEncoding,
    fieldname: snapshot.metadata.fullPath,
    filename: snapshot.metadata.name,
    title: file.name,
    publicUrl,
  };
};

export const uploadFilesToFirebase = (
  files: File[]
): Promise<Partial<Document>[]> => {
  return Promise.all(files.map((file) => uploadFileToFirebase(file)));
};

export const removeFileFromFirebase = async (
  path: string
): Promise<boolean> => {
  const desertRef = ref(storage, path);
  await deleteObject(desertRef);
  return true;
};
