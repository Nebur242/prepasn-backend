import { Status } from '@prepa-sn/shared/enums';

export interface BaseContent {
  id: number;
  title: string;
  description: string;
  featuredImage?: string;
  videoUrl?: string;
  status: Status.ACTIVE | Status.PENDING;
  createdAt: Date;
  updatedAt: Date;
}
