import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class PostCreateDto {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  text: string;
}
