import { envs } from './envs.plugin';

describe('env plugin', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'jose.dev.ve@gmail.com',
      MAILER_SECRET_KEY: 'asdasdadasd',
      PROD: false,
      MONGO_URL: 'mongodb://crack:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-test',
      MONGO_USER: 'crack',
      MONGO_PASSWORD: 'asdasdadasd',
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'abc';

    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
