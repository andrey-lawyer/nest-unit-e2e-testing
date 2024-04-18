import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostCreateDto } from './dto/postCreate.dto';
import { PassportModule } from '@nestjs/passport';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockUser = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
  };

  const mockPost = {
    id: 1,
    title: 'post',
    text: 'description',
    user: mockUser,
  };

  const mockPostService = {
    create: jest.fn().mockResolvedValueOnce(mockPost),
    findAll: jest.fn().mockResolvedValueOnce([{ ...mockPost, user: mockUser }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
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

    const req = { user: { id: 1, name: 'John', email: 'john@example.com' } };

    const result = await controller.createPost(newPost as PostCreateDto, req);

    expect(service.create).toHaveBeenCalled();

    expect(result).toEqual(mockPost);
  });

  it('should return all posts', async () => {
    const result = await controller.getAllPost();

    expect(service.findAll).toHaveBeenCalled();

    expect(result).toEqual([mockPost]);
  });

  afterEach(() => {
    mockPostService.create.mockClear();
    mockPostService.findAll.mockClear();
  });
});
