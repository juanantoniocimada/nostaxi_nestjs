import { Controller, Get, Param, Patch, Body } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehiclesService: VehiclesService) {}

    @Get()
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.vehiclesService.findOne(id);
    }

}
