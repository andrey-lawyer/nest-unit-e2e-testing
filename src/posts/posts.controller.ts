import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostCreateDto } from './dto/postCreate.dto';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPost(@Body() postCreateDto: PostCreateDto): Promise<PostEntity> {
    const data = await this.postService.create(postCreateDto);
    return data;
  }

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    const data = await this.postService.findAll();
    return data;
  }
}
