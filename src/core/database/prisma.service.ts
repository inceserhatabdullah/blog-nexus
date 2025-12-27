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

    const prismaClient = new PrismaClient({ adapter });

    const prismaExtendedClient = prismaClient.$extends(
      {
        query: {
          $allModels: {
            findMany({ args, query }) {
              args.where ??= {};
              args.where.deletedAt ??= null;

              return query(args);
            },
            findFirst({ args, query }) {
              args.where ??= {};
              args.where.deletedAt ??= null;

              return query(args);
            }
          }
        }
      }
    )
    super({ adapter });

    Object.assign(this, prismaExtendedClient);

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