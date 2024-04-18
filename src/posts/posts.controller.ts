import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from './posts.service';
import { PostCreateDto } from './dto/postCreate.dto';
import { Post as PostEntity } from './post.entity';
import { User } from 'src/auth/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createPost(
    @Body() postCreateDto: PostCreateDto,
    @Req() req,
  ): Promise<PostEntity> {
    const { id, name, email }: Pick<User, 'name' | 'email' | 'id'> = req.user;

    const data = await this.postService.create(postCreateDto, {
      id,
      name,
      email,
    });
    return data;
  }

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    const data = await this.postService.findAll();
    return data;
  }
}
