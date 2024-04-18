import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockUser = {
    name: 'User',
    email: 'example@example.com',
  };

  const mockToken = 'token';

  const mockRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const existUser = {
    id: 1,
    name: 'User',
    email: 'user@gmail.com',
    passwordHash: '12345678',
    posts: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register the new user', async () => {
    const newUser = {
      name: 'User',
      email: 'user@gmail.com',
      password: '12345678',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(async (): Promise<string> => {
        return Promise.resolve('hashedPassword');
      });

    jest
      .spyOn(repository, 'save')
      .mockImplementationOnce(() => Promise.resolve(mockUser as User));

    const data = await service.signUp(newUser as SignUpDto);
    expect(data).toEqual(mockUser);
  });

  it('should return error - User with this email already exists', async () => {
    const newUser = {
      name: 'User',
      email: 'user@gmail.com',
      password: '12345678',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(existUser);

    await expect(service.signUp(newUser)).rejects.toThrow(
      'User with this email already exists',
    );
  });

  it('should login user', async () => {
    const loginUser = {
      email: 'user@gmail.com',
      password: '12345678',
    };
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(existUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(async (): Promise<boolean> => {
        return Promise.resolve(true);
      });
    jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

    const data = await service.login(loginUser as LoginDto);
    expect(data).toEqual({ token: mockToken });
  });

  it('should return Error - Invalid email', async () => {
    const loginUser = {
      email: 'user@gmail.com',
      password: '12345678',
    };
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);
    expect(service.login(loginUser as LoginDto)).rejects.toThrow(
      new UnauthorizedException('Invalid email'),
    );
  });

  it('should return Error - Invalid password', async () => {
    const loginUser = {
      email: 'user@gmail.com',
      password: '12345678',
    };
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(existUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(async (): Promise<boolean> => {
        return Promise.resolve(false);
      });
    expect(service.login(loginUser as LoginDto)).rejects.toThrow(
      new UnauthorizedException('Invalid  password'),
    );
  });

  afterEach(() => {
    mockRepository.save.mockClear();
    mockRepository.findOneBy.mockClear();
  });
});
