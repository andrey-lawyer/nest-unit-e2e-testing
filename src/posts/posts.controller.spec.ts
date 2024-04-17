import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostCreateDto } from './dto/postCreate.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPost = {
    id: 1,
    title: 'post',
    text: 'description',
  };

  const mockPostService = {
    create: jest.fn().mockResolvedValueOnce(mockPost),
    findAll: jest.fn().mockResolvedValueOnce([mockPost]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created post', async () => {
    const newPost = {
      title: 'post',
      text: 'description',
    };

    const result = await controller.createPost(newPost as PostCreateDto);

    expect(service.create).toHaveBeenCalled();

    expect(result).toEqual(mockPost);
  });

  it('should return all posts', async () => {
    const result = await controller.getAllPost();

    expect(service.findAll).toHaveBeenCalled();

    expect(result).toEqual([mockPost]);
  });
});
