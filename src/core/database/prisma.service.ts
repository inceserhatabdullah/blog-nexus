import { Injectable, InternalServerErrorException, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@core/prisma/generated/client";
import { OnModuleInit } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import pg from "pg";
import { AppConfig } from "@core/config/app.config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(PrismaService.name);
  private pool: pg.Pool;

  constructor() {

    const pool = new pg.Pool(
      {
        connectionString: AppConfig.databaseUrl,
      }
    );

    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;

      this.logger.log('Database connection established successfully.');
    } catch (e) {
      this.logger.error('Database connection failed:', e);
      throw new InternalServerErrorException('Database initialization failed.');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await this.pool.end();

      this.logger.warn('Database connection closed successfully.');
      this.logger.warn('Database connection pool closed gracefully.');
    } catch (e) {
      this.logger.error('Error during database shutdown:', e);
    }
  }

}