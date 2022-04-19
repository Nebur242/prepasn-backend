import { User } from '../../../../src/common/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class Student extends User {}
