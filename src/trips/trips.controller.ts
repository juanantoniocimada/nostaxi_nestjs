import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id/accept')
  accept(@Param('id') id: string) {
    return this.tripsService.accept(Number(id));
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string) {
    return this.tripsService.reject(Number(id));
  }

  @Get(':id/position')
  getTaxiPosition(@Param('id') id: string) {
    return this.tripsService.getTaxiPosition(Number(id));
  }

  
  @Patch(':id/position')
  updatePosition(
    @Param('id') id: number,
    @Body() body: { latitude: number; longitude: number },
  ) {
    return this.tripsService.updateTaxiPosition(
      +id,
      body.latitude,
      body.longitude,
    );
  }
  
}
