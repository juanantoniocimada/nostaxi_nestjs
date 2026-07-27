import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from 'src/trips/trips.controller';
import { TripsService } from 'src/trips/trips.service';
import { Trip } from 'src/trips/entities/trip.entity';
import { PushModule } from 'src/push/push.module';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
  imports: [
    PushModule,
    TypeOrmModule.forFeature([Trip]),
  ],
})
export class TripsModule {}