/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  displayType,
  exerciseType,
  level,
  Role,
  Status,
} from '@prepa-sn/shared/enums';

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

export interface User {
  id: number;
  uid: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  email?: string;
  phone: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
  roles: Role[];
}

export interface Student extends User {}

export interface Instructor extends User {}

export interface Admin extends User {}

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
  isFree: boolean;
  price: number;
  overview: string;
  grades: Grade[];
  chapters: Chapter[];
  documents: Document[];
  categories: Category[];
}

export interface Grade extends BaseContent {
  children: Grade[];
  parent: Grade | null;
  courses: Course[];
}

export interface Chapter extends BaseContent {
  course: Course;
  documents: Document[];
  exercises: Exercise[];
}

export interface Question extends BaseContent {
  exercise: Exercise;
}

export interface Exercise extends BaseContent {
  chapter: Chapter;
  type: exerciseType;
  questions: Question[];
  level: level;
  display: displayType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Classroom extends BaseContent {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Category extends BaseContent {}
