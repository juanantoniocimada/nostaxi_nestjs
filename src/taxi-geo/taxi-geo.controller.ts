import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TaxiGeoService } from './taxi-geo.service';

@Controller('taxi-geo')
export class TaxiGeoController {

  constructor(
    private readonly taxiGeoService: TaxiGeoService
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.taxiGeoService.create(body);
  }

  @Get(':taxi_id')
  findOne(@Param('taxi_id') taxi_id: number) {
    return this.taxiGeoService.findOne(taxi_id);
  }
}