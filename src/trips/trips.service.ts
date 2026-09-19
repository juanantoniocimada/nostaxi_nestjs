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

    /*
        @ManyToOne(() => User, { nullable: true })
        @JoinColumn({ name: 'user_id' })
        user!: User | null;
    
        @ManyToOne(() => TaxiInterest, { nullable: true })
        @JoinColumn({ name: 'taxi_interest_id' })
        taxiInterest!: TaxiInterest | null;
        */

    const trip = this.tripRepository.create({

      user: data.user ?? null,
      taxiInterest: data.taxiInterest ?? null,

      driverName: data.driverName,
      plate: data.plate,
      pickupTime: data.pickupTime,
      confirmed: data.confirmed ?? false,
      userOriginPosName: data.userOriginPosName ?? null,
      userOriginPosLat: data.userOriginPosLat ?? null,
      userOriginPosLng: data.userOriginPosLng ?? null,
      userDestinationPosName: data.userDestinationPosName ?? null,
      userDestinationPosLat: data.userDestinationPosLat ?? null,
      userDestinationPosLng: data.userDestinationPosLng ?? null,
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

  async getTrips(
    driverName?: string,
    userId?: number,
    taxiInterestId?: number,
  ) {
    return this.tripRepository.find({
      where:
        taxiInterestId !== undefined
          ? { taxiInterest: { id: taxiInterestId } }
          : userId !== undefined
            ? { user: { id: userId } }
            : driverName
              ? { driverName }
              : {},

      relations: ['user', 'taxiInterest'],

      order: {
        pickupTime: 'ASC',
      },
    });
  }

  async get(id: number) {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['user', 'taxiInterest'],
    });

    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }

    return trip;
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

  async accept(id: number, taxiInterestId: number) {

    await this.tripRepository.update(id, {
      confirmed: true,
      taxiInterest: { id: taxiInterestId },
    });

    return this.tripRepository.findOne({
      where: { id },
      relations: ['user', 'taxiInterest'],
    });
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
      where: { id }
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
