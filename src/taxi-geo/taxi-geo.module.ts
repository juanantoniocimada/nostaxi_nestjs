import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiGeoController } from './taxi-geo.controller';
import { TaxiGeoService } from './taxi-geo.service';
import { TaxiGeo } from './entities/taxi-geo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxiGeo])
  ],
  controllers: [
    TaxiGeoController
  ],
  providers: [
    TaxiGeoService
  ],
  exports: [
    TaxiGeoService
  ]
})
export class TaxiGeoModule {}