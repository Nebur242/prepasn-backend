import { EntityRepository, Repository } from 'typeorm';
import { Section } from '../entities/section.entity';

@EntityRepository(Section)
export class SectionsRepository extends Repository<Section> {}
