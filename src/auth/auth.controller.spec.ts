import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SignUpDto } from './dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockUser = {
    name: 'John',
    email: 'john@example.com',
  };
  const mockToken = 'token';

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValueOnce(mockUser),
    login: jest.fn().mockResolvedValueOnce({ token: mockToken }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return registered user', async () => {
    const newUser = {
      name: 'User',
      email: 'user@gmail.com',
      password: '12345678',
    };

    const result = await controller.signUp(newUser as SignUpDto);

    expect(service.signUp).toHaveBeenCalled();

    expect(result).toEqual(mockUser);
  });

  it('should return token from login', async () => {
    const userLogin = {
      email: 'user@gmail.com',
      password: '12345678',
    };

    const result = await controller.login(userLogin);

    expect(service.login).toHaveBeenCalled();

    expect(result).toEqual({ token: mockToken });
  });

  afterEach(() => {
    mockAuthService.login.mockClear();
    mockAuthService.signUp.mockClear();
  });
});
