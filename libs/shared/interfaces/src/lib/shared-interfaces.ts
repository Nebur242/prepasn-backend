import { Status } from '@prepa-sn/shared/enums';

export interface FirebaseConfig {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

export interface Document {
  id: number;
  title: string;
  description?: string;
  publicUrl: string;
  size: number;
  mimetype: string;
  filename: string;
  fieldname: string;
  originalname?: string;
  encoding?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseContent {
  id: number;
  title: string;
  description: string;
  image: Document;
  video: Document;
  status: Status.ACTIVE | Status.PENDING;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter extends BaseContent {
  course: Course;
  documents: Document[];
}

export interface Course extends BaseContent {
  grades: Grade[];
  chapters: Chapter[];
  documents: Document[];
}

export interface Grade extends BaseContent {
  children: Grade[];
  parent: Grade | null;
  courses: Course[];
}

export interface Chapter extends BaseContent {
  course: Course;
  documents: Document[];
}
