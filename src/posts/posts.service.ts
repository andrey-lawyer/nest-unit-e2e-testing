import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

import { PostCreateDto } from './dto/postCreate.dto';

import { User } from '../auth/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(
    postCreateDto: PostCreateDto,
    user: Pick<User, 'name' | 'email' | 'id'>,
  ): Promise<Post> {
    try {
      const newPost = { ...postCreateDto, user };
      const savedPost = await this.postRepository.save(newPost);
      return savedPost;
    } catch (error) {
      throw new Error('Failed to save post');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .select([
          'post.id',
          'post.title',
          'post.text',
          'user.id',
          'user.name',
          'user.email',
        ])
        .getMany();

      return posts;
    } catch (error) {
      throw new Error('Failed to find posts');
    }
  }
}
