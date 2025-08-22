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
import { AppDataSource } from '../../data-source';
// import { AuthGuard } from '../../auth/auth.guard';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';

const locationRepository = AppDataSource.getTreeRepository('Location');

@Controller('locations')
// @UseGuards(AuthGuard) // Use it when you want to protect the route
export class LocationsController {
  @ApiOperation({ summary: 'Get all locations' })
  @Get()
  findAll() {
    return locationRepository.findTrees();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return locationRepository.findOneBy({ id });
  }

  @ApiOperation({
    summary:
      'Create a new location with auto-generated number by parent location and key',
  })
  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    const { key, parentId, ...locationData } = createLocationDto;
    const location = locationRepository.create(locationData);
    let number: string = key;

    if (parentId) {
      const parent = await locationRepository.findOneBy({ id: parentId });

      if (parent) {
        number = parent.number + '-' + key;
        location.parent = parent;
      }
    }

    location.number = number;

    return locationRepository.save(location);
  }

  @ApiOperation({ summary: 'Update a location by ID' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    await locationRepository.update(id, updateLocationDto);
    return HttpStatus.ACCEPTED;
  }

  @ApiOperation({ summary: 'Delete a location by ID' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await locationRepository.delete(id);
    return HttpStatus.NO_CONTENT;
  }
}
