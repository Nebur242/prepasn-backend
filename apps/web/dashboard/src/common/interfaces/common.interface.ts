import { Status } from '@prepa-sn/shared/enums';
import { Document } from '@prepa-sn/shared/interfaces';

export interface BaseContent {
  id: number;
  title: string;
  description: string;
  // featuredImage?: string;
  // videoUrl?: string;
  image: Document;
  video: Document;
  status: Status.ACTIVE | Status.PENDING;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConfirmation<T> {
  title: string;
  content: string;
  data: T;
  onOk?: () => void;
  onCancel?: () => void;
}
