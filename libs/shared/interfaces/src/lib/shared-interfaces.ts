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
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
