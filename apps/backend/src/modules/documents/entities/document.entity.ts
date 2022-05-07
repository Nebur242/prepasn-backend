import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: String })
  title: string;

  @Column({ nullable: true, type: String, default: null })
  description: string;

  @Column({ nullable: false })
  publicUrl: string;

  @Column({ nullable: true, default: 0 })
  size: number;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  fieldname: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  encoding: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
