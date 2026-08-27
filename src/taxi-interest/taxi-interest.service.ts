import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiInterest } from './entities/taxi-interest.entity';

@Injectable()
export class TaxiInterestService {

  constructor(
    @InjectRepository(TaxiInterest)
    private readonly taxiInterestRepository: Repository<TaxiInterest>,
  ) { }


  async create(data: any): Promise<TaxiInterest> {

    const taxiInterest = this.taxiInterestRepository.create({
      driverName: data.driverName ?? null,
      driverPhone: data.driverPhone ?? null,
      island: data.island,
      password: data.password,
      pushToken: data.pushToken ?? null,
      photo: data.photo ?? null,
      vehicleModel: data.vehicleModel ?? null,
      vehiclePlate: data.vehiclePlate ?? null,
    });

    return await this.taxiInterestRepository.save(taxiInterest);
  }

  async findByPhone(phone: string): Promise<TaxiInterest | null> {
    return await this.taxiInterestRepository.findOne({
      where: {
        driverPhone: phone,
      },
    });
  }

}