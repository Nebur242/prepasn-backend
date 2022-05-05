export interface Document {
  id: number;
  title: string;
  type: string;
  publicUrl: string;
  size: number;
  mimetype: string;
  filename: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  createdAt: Date;
  updatedAt: Date;
}
