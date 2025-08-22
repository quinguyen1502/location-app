import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LocationsController } from './controllers/locations.controller';

@Module({
  imports: [AuthModule],
  controllers: [LocationsController],
})
export class LocationModule {}
