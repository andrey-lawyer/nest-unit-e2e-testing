import { IsString } from 'class-validator';
import { Post } from '../posts/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  passwordHash: string;

  @OneToMany(() => Post, (posts) => posts.user, {
    nullable: true,
  })
  posts: Post[];
}
