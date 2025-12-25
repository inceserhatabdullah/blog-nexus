export class AppConfig {
  static readonly apiVersionOnePrefix = 'api/v1';

  static get nodeEnvironment() {
    return process.env.NODE_ENV || 'development';
  }

  static get databaseUrl() {
    return process.env.DATABASE_URL;
  }

  static get apiPort() {
    return Number(process.env.API_PORT) || 3000;
  }

  static get jwtExpiresIn() {
    return process.env.JWT_EXPIRES_IN || '1d';
  }
}