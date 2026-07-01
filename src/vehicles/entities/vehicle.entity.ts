import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(
    { name: 'plate' }
  )
  plate!: string;
}