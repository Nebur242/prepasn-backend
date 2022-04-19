import { EntityRepository, Repository } from 'typeorm';
import { Chapter } from '../entities/chapter.entity';

@EntityRepository(Chapter)
export class ChaptersRepository extends Repository<Chapter> {}
