import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { SubscriptionState } from '../entities/subscription.entity';

export class FilterDto {
  @ApiProperty({
    description: 'The subscriber id',
    required: true,
    type: String,
  })
  @IsDefined()
  subscriber: User['id'];

  @ApiProperty({
    description: 'Current state of course subscription',
    required: true,
    type: SubscriptionState,
    enum: SubscriptionState,
  })
  @IsOptional()
  @IsEnum(SubscriptionState)
  state?: SubscriptionState;
}
