import { IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { Course } from "../../courses/entities/course.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateCartItemDto {
    @ApiProperty({
        description: 'The id of the course',
        required: true,
        type: String,
      })
    @IsNotEmpty()
    course: Course['id']
}
