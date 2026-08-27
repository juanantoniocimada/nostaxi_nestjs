import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taxi_interest')
export class TaxiInterest {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'driver_name', length: 100 })
  driverName!: string;

  @Column({ name: 'driver_phone', length: 30 })
  driverPhone!: string;

  @Column({ length: 50 })
  island!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({
    name: 'push_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  pushToken!: string | null;

 @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  photo!: string | null;

  @Column({
    name: 'vehicle_model',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  vehicleModel!: string | null;

  @Column({
    name: 'vehicle_plate',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  vehiclePlate!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

}