import { User } from '@prepa-sn/backend/common/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class Instructor extends User {}
