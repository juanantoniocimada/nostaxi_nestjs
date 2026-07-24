import { Body, Controller, Post } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {

  constructor(
    private readonly tripsService: TripsService
  ) {}


  @Post()
  create(@Body() data: any) {
    return this.tripsService.create(data);
  }
}
