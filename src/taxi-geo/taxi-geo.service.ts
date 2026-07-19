import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiGeo } from './entities/taxi-geo.entity';

@Injectable()
export class TaxiGeoService {

  constructor(
    @InjectRepository(TaxiGeo)
    private readonly taxiGeoRepository: Repository<TaxiGeo>,
  ) {}

  async create(data: {
    taxi_id: number;
    latitude: string;
    longitude: string;
  }) {
    const taxiGeo = this.taxiGeoRepository.create(data);

    return this.taxiGeoRepository.save(taxiGeo);
  }


  async findOne(taxi_id: number) {
    return this.taxiGeoRepository.findOne({
      where: {
        taxi_id
      }
    });
  }
}