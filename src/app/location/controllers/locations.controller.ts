import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  NotFoundException,
  // UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ApiOperation } from '@nestjs/swagger';
// import { AuthGuard } from '../../auth/auth.guard';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';
import { LocationService } from '../services/location.service';
import { Location } from '../entities/Location';

@Controller('locations')
// @UseGuards(AuthGuard) // Use it when you want to protect the route
export class LocationsController {
  constructor(private readonly LocationService: LocationService) {}

  @ApiOperation({ summary: 'Get all locations' })
  @Get()
  findAll() {
    return this.LocationService.findAll();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.LocationService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return result;
  }

  @ApiOperation({
    summary:
      'Create a new location with auto-generated number by parent location and key',
  })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    const { key, parentId, ...locationData } = createLocationDto;
    return this.LocationService.create(key, parentId, locationData as Location);
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const result = await this.LocationService.update(
      id,
      updateLocationDto as Location,
    );
    if (!result.affected) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return HttpStatus.ACCEPTED;
  }

  @ApiOperation({ summary: 'Delete a location by ID' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.LocationService.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }
}
