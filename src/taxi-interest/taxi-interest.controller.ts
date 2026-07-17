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
    

}