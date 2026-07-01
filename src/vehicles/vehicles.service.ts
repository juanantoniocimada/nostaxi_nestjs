import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  findAll() {
    return this.vehiclesRepository.find();
  }

  findOne(id: number) {
    return this.vehiclesRepository.findOne({ where: { id } });
  }

  update(id: number, updateData: Partial<Vehicle>) {
    return this.vehiclesRepository.update(id, updateData);
  }
}
