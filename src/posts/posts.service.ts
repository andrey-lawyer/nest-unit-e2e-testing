import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostCreateDto } from './dto/postCreate.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(post: PostCreateDto): Promise<Post> {
    try {
      const data = await this.postRepository.save(post);
      return data;
    } catch (error) {
      throw new Error('It failed to save');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const data = await this.postRepository.find();
      return data;
    } catch (error) {
      throw new Error('It failed to find');
    }
  }
}
