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

  @Column({ type: 'json', nullable: true })
  features!: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

}