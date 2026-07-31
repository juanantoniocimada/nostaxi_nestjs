import { Injectable, NotFoundException } from '@nestjs/common';
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

      /*
      await this.pushService.sendPush(
        data.deviceToken, // El token debe venir en data
        '¡Nuevo viaje creado!',
        `Viaje con ${data.driverName} - Placa: ${data.plate}`
      );
      */

    } catch (error: any) {
      // El error no detiene la creación del viaje
      console.error('Error enviando push:', error.message);
    }

    return this.tripRepository.save(trip);
  }

  async getStatus(id: number) {

    const trip = await this.tripRepository.findOne({
      where: { id }
    });

    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }

    return {
      confirmed: trip.confirmed
    };
  }

  async accept(id: number) {
    await this.tripRepository.update(id, {
      confirmed: true,
    });

    return this.tripRepository.findOneBy({ id });
  }

  async reject(id: number) {
    await this.tripRepository.update(id, {
      confirmed: false,
    });

    return this.tripRepository.findOneBy({ id });
  }

  async updateTaxiPosition(
    id: number,
    latitude: number,
    longitude: number,
  ) {
    await this.tripRepository.update(id, {
      taxiLatitude: latitude,
      taxiLongitude: longitude,
    });

    return this.tripRepository.findOneBy({ id });
  }

  async getTaxiPosition(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id },
      select: {
        taxiLatitude: true,
        taxiLongitude: true,
      },
    });

    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }

    return {
      latitude: trip.taxiLatitude,
      longitude: trip.taxiLongitude,
    };
  }

}
