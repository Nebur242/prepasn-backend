import { documentType } from '@prepa-sn/shared/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: String })
  title: string;

  @Column({ nullable: false, enum: documentType })
  type: string;

  @Column({ nullable: false })
  url: string;
}
