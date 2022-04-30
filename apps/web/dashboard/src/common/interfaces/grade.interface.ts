import { LANGUAGE } from '@prepa-sn/shared/enums';
import { BaseContent } from './common.interface';

export interface Grade extends BaseContent {
  parent?: Grade | null;
  language: LANGUAGE.FR | LANGUAGE.EN;
}
