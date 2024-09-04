import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { AdaptersModule } from './adapters/adapters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './adapters/config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { FilterExceptionGlobal } from './filtros/filter-exception-global';

@Module({
  imports: [
    ApplicationModule,
    AdaptersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionGlobal,
    },
  ],
})
export class AppModule {}
