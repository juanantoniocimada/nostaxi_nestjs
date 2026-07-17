import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiInterest } from './entities/taxi-interest.entity';

@Injectable()
export class TaxiInterestService {

  constructor(
    @InjectRepository(TaxiInterest)
    private readonly taxiInterestRepository: Repository<TaxiInterest>,
  ) {}


  async create(data: any): Promise<TaxiInterest> {

    const taxiInterest = this.taxiInterestRepository.create({
      driverName: data.driver_name,
      driverPhone: data.driver_phone,
      island: data.island,
      features: data.features
    });

    return await this.taxiInterestRepository.save(taxiInterest);
  }

}