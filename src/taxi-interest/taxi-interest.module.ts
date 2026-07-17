

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiInterest } from './entities/taxi-interest.entity';
import { TaxiInterestService } from './taxi-interest.service';
import { TaxiInterestController } from './taxi-interest.controller';

@Module({
  controllers: [TaxiInterestController],
  providers: [TaxiInterestService],
  imports: [
    TypeOrmModule.forFeature([TaxiInterest]),
  ],
})
export class TaxiInterestModule {}
