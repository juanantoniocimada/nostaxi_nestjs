import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { PushService } from '../push/push.service';


@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    private readonly pushService: PushService
  ) { }


  async create(data: any) {



    const trip = this.tripRepository.create({
      driverName: data.driverName,
      plate: data.plate,
      pickupTime: data.pickupTime,
      confirmed: data.confirmed ?? false
    });

    try {
      await this.pushService.sendPush(
        data.deviceToken, // El token debe venir en data
        '¡Nuevo viaje creado!',
        `Viaje con ${data.driverName} - Placa: ${data.plate}`
      );
    } catch (error: any) {
      // El error no detiene la creación del viaje
      console.error('Error enviando push:', error.message);
    }

    return this.tripRepository.save(trip);
  }
}
