import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
  // GET /trips?driverName=Pedro
  // GET /trips?id=123
  // GET /trips?taxiInterestId=456

  @Get()
  getTrips(
    @Query('driverName') driverName?: string,
    @Query('id') id?: string,
    @Query('taxiInterestId') taxiInterestId?: string,
  ) {
    return this.tripsService.getTrips(
      driverName,
      id !== undefined ? Number(id) : undefined,
      taxiInterestId !== undefined ? Number(taxiInterestId) : undefined,
    );
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.tripsService.get(Number(id));
  }

  @Get('status/:id')
  getStatus(@Param('id') id: string) {
    return this.tripsService.getStatus(Number(id));
  }

  @Patch(':id/accept')
  accept(
    @Param('id') id: string,
    @Body() data: { taxiInterestId: number }
  ) {
    return this.tripsService.accept(
      Number(id),
      data.taxiInterestId
    );
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
