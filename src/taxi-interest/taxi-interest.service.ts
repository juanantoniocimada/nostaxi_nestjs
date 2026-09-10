import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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


  async updateField(
    id: number,
    field: string,
    value: any
  ) {

    const user = await this.taxiInterestRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const allowedFields = [
      'driverName',
      'driverPhone',
      'island',
      'password',
      'pushToken',
      'photo',
      'vehicleModel',
    ];

    if (!allowedFields.includes(field)) {
      throw new ConflictException(
        `Field '${field}' cannot be updated`
      );
    }

    if (value === undefined || value === null || value === '') {
      throw new ConflictException(
        'Value is required'
      );
    }

    user[field] = value;

    return this.taxiInterestRepository.save(user);
  }

  async findByPhone(phone: string): Promise<TaxiInterest | null> {
    return await this.taxiInterestRepository.findOne({
      where: {
        driverPhone: phone,
      },
    });
  }

}