import { IsString } from 'class-validator';
import { User } from '../auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  text: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
