import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../data-source';
import { Location } from '../entities/Location';

@Injectable()
export class LocationsService {
  private readonly locationRepository =
    AppDataSource.getTreeRepository(Location);

  findAll() {
    return this.locationRepository.findTrees();
  }

  findOne(id: number) {
    return this.locationRepository.findOneBy({ id });
  }

  async create(key: string, parentId: number, data: Location) {
    const location = this.locationRepository.create(data);
    let number: string = key;

    if (parentId) {
      const parent = await this.locationRepository.findOneBy({ id: parentId });

      if (parent) {
        number = parent.number + '-' + key;
        location.parent = parent;
      }
    }

    location.number = number;

    return this.locationRepository.save(location);
  }

  update(id: number, data: Location) {
    return this.locationRepository.update(id, data);
  }

  delete(id: number) {
    return this.locationRepository.delete(id);
  }
}
