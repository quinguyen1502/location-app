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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { AuthGuard } from '../../auth/auth.guard';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';
import { LocationService } from '../services/location.service';
import { Location } from '../entities/Location';

@Controller('locations')
// @UseGuards(AuthGuard) // Use it when you want to protect the route
export class LocationsController {
  constructor(private readonly LocationService: LocationService) {}

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'List of all locations',
    type: [Location],
  })
  @Get()
  findAll() {
    return this.LocationService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a location by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location found',
    type: Location,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  @Get(':id')
  async retrieve(@Param('id', ParseIntPipe) id: number) {
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
  @ApiResponse({
    status: 201,
    description: 'Location created successfully',
    type: Location,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    const { key, parentId, ...locationData } = createLocationDto;
    return this.LocationService.create(key, parentId, locationData as Location);
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Location updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Location deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.LocationService.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }
}
