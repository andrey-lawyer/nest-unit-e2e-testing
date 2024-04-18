import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';
// import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
