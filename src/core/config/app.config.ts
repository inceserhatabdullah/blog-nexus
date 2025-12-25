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

  static get jwtExpiresIn(): any {
    return process.env.JWT_EXPIRES_IN || '1d';
  }

  static get jwtSecret() {
    return process.env.JWT_SECRET!;
  }
}