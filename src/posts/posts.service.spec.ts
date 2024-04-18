import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostCreateDto } from './dto/postCreate.dto';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  const mockUser = {
    id: 1,
    name: 'User',
    email: 'example@example.com',
  };

  const mockPost = {
    id: 1,
    title: 'post',
    text: 'description',
    user: mockUser,
  };

  const mockRepository = {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created post', async () => {
    const newPost = { title: 'post', text: 'description' };

    jest
      .spyOn(repository, 'save')
      // .mockImplementationOnce(() => Promise.resolve(mockPost));
      .mockResolvedValueOnce(mockPost as Post);

    const data = await service.create(newPost as PostCreateDto, mockUser);
    expect(data).toEqual(mockPost);
  });

  it('should be found posts', async () => {
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockPost]),
    };

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);

    const data = await service.findAll();
    expect(data).toEqual([mockPost]);
  });

  afterEach(() => {
    mockRepository.save.mockClear();
    mockRepository.createQueryBuilder.mockClear();
  });
});
