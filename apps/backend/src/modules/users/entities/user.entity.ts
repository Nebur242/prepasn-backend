import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prepa-sn/shared/enums';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  description?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  phone?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  profile?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  address?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  city?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  zipcode?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  country?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  facebook?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  linkedin?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  twitter?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  instagram?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  youtube?: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @Column({ nullable: true, default: null })
  birthDate?: Date;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  hasAgreedWithTermsAndConditions: boolean;

  @ApiProperty()
  @Column({ unique: true })
  uid: string;

  @ApiProperty({
    enum: [...Object.values(Status)],
    default: Status.PENDING,
    readOnly: true,
  })
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
