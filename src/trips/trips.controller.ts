import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {

  constructor(
    private readonly tripsService: TripsService
  ) { }


  @Post()
  create(@Body() data: any) {
    return this.tripsService.create(data);
  }

  @Get('status/:id')
  getStatus(@Param('id') id: string) {
    return this.tripsService.getStatus(Number(id));
  }
}
