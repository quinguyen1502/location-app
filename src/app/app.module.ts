import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationsController } from './controllers/locations.controller';
import { AppDataSource } from './data-source';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [LocationsController],
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
