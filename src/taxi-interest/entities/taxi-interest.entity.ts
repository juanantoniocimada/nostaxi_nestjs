import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('taxi_interest')
export class TaxiInterest {

  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ name: 'driver_name', length: 100 })
  driverName: string | undefined;

  @Column({ name: 'driver_phone', length: 30 })
  driverPhone: string | undefined;

  @Column({ length: 50 })
  island: string | undefined;

  @Column({ type: 'json', nullable: true })
  features: string[] | undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date | undefined;

}