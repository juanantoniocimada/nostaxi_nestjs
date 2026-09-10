import { Controller, Get, Param, Patch, Body, Post } from "@nestjs/common";
import { TaxiInterest } from "./entities/taxi-interest.entity";
import { TaxiInterestService } from "./taxi-interest.service";

@Controller('taxi-interest')
export class TaxiInterestController {
  constructor(
    private readonly taxiInterestService: TaxiInterestService
  ) { }

  @Post()
  create(@Body() data: Partial<TaxiInterest>) {
    return this.taxiInterestService.create(data);
  }

  @Get(':phone')
  findByPhone(@Param('phone') phone: string) {
    return this.taxiInterestService.findByPhone(phone);
  }

  @Patch(':id')
  updateField(
    @Param('id') id: number,
    @Body()
    body: {
      field: 'driverName' | 'driverPhone' | 'island' | 'password' | 'pushToken' | 'photo' | 'vehicleModel';
      value: string;
    }

  ) {
    return this.taxiInterestService.updateField(
      id,
      body.field,
      body.value
    );
  }

}