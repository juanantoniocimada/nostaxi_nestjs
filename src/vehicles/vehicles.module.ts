

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
  ],
})
export class VehiclesModule {}
