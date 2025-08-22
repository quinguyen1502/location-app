import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { LocationModule } from './location/location.module';
import { AppDataSource } from './data-source';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppLogger } from './logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    LocationModule,
  ],
  providers: [
    AppLogger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  onModuleInit() {
    AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((error) => {
        console.error('Error during Data Source initialization', error);
      });
  }
}
