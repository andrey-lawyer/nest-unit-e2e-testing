import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { SignUpDto } from '../src/auth/dto/signup.dto';
import { userStub } from './stubs/user.stab';
import { DatabaseService } from '../src/database/database.service';
import { User } from '../src/auth/user.entity';

import { Post } from '../src/posts/post.entity';
import { LoginDto } from 'src/auth/dto/login.dto';

describe('UsersController', () => {
  let appDataSource: DataSource;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    appDataSource = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await appDataSource.getRepository(Post).delete({});
    await appDataSource.getRepository(User).delete({});
    await app.close();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserRequest: SignUpDto = {
        name: userStub().name,
        email: userStub().email,
        password: userStub().password,
      };

      const responseUserCreate = {
        name: userStub().name,
        email: userStub().email,
      };
      const response = await request(httpServer)
        .post('/auth/signup')
        .send(createUserRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(responseUserCreate);

      const user = await appDataSource.getRepository(User).findOneBy({
        email: createUserRequest.email,
      });
      expect(user).toMatchObject(responseUserCreate);
    });
  });

  describe('loginUser', () => {
    it('should login user', async () => {
      const loginUserRequest: LoginDto = {
        email: userStub().email,
        password: userStub().password,
      };

      const response = await request(httpServer)
        .post('/auth/login')
        .send(loginUserRequest);
      expect(response.status).toBe(200);
    });

    it('should return unauthorized', async () => {
      const loginUserRequest: LoginDto = {
        email: 'new' + userStub().email,
        password: userStub().password,
      };

      const response = await request(httpServer)
        .post('/auth/login')
        .send(loginUserRequest);
      expect(response.status).toBe(401);
    });
  });

  describe('getUsers', () => {
    const users = [
      {
        name: userStub().name,
        email: userStub().email,
      },
    ];
    it('should return users', async () => {
      const response = await request(httpServer).get('/auth/users');
      expect(response.status).toBe(200);

      expect(response.body).toMatchObject(users);
    });
  });
});
