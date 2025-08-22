import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/location.service';

@Module({
  imports: [AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationModule {}
