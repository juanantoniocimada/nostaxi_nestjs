import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>
  ) { }


  create(data: any) {

    const trip = this.tripRepository.create({
      driverName: data.driverName,
      plate: data.plate,
      pickupTime: data.pickupTime,
      confirmed: data.confirmed ?? false
    });

    return this.tripRepository.save(trip);
  }
}
