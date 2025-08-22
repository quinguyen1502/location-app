import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  // UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ApiOperation } from '@nestjs/swagger';
// import { AuthGuard } from '../../auth/auth.guard';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';
import { LocationsService } from '../services/location.service';
import { Location } from '../entities/Location';

@Controller('locations')
// @UseGuards(AuthGuard) // Use it when you want to protect the route
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Get all locations' })
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.findOne(id);
  }

  @ApiOperation({
    summary:
      'Create a new location with auto-generated number by parent location and key',
  })
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    const { key, parentId, ...locationData } = createLocationDto;
    return this.locationsService.create(
      key,
      parentId,
      locationData as Location,
    );
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    await this.locationsService.update(id, updateLocationDto as Location);
    return HttpStatus.ACCEPTED;
  }

  @ApiOperation({ summary: 'Delete a location by ID' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.locationsService.delete(id);
    return HttpStatus.NO_CONTENT;
  }
}
