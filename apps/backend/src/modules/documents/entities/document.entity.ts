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

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column()
  publicUrl: string;

  @Column({ nullable: true, default: 0 })
  size?: number;

  @Column({ nullable: true })
  mimetype?: string;

  @Column({ nullable: true })
  filename?: string;

  @Column({ nullable: true })
  fieldname?: string;

  @Column({ nullable: true })
  originalname?: string;

  @Column({ nullable: true })
  encoding?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
