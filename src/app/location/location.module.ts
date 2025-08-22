import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LocationsController } from './controllers/locations.controller';
import { LocationService } from './services/location.service';

@Module({
  imports: [AuthModule],
  controllers: [LocationsController],
  providers: [LocationService],
})
export class LocationModule {}
