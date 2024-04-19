import { ConfigService } from '@nestjs/config';

type postgres = 'postgres';

export const AppDataSource = (configService: ConfigService) => {
  const host =
    configService.get<string>('NODE_ENV') === 'test'
      ? configService.get<string>('POSTGRES_TEST_HOST')
      : configService.get<string>('POSTGRES_HOST');

  const port =
    configService.get<string>('NODE_ENV') === 'test'
      ? configService.get<number>('POSTGRES_TEST_PORT')
      : configService.get<number>('POSTGRES_PORT');

  console.log(port);
  return {
    type: 'postgres' as postgres,
    host,
    port,
    username: configService.get<string>('POSTGRES_USERNAME'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
  };
};
