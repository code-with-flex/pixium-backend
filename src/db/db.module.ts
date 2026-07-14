import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * Global so `RedisService` doesn't need to be re-imported into every
 * feature module that needs it. Import `DbModule` once, in `AppModule`.
 * A `PrismaService` will join this module once Postgres-backed
 * features (users, leaderboard, quests, factions) land.
 */
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class DbModule {}
