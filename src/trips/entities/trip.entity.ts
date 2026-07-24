
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trips')
export class Trip {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'driver_name' })
    driverName!: string;

    @Column()
    plate!: string;

    @Column({ name: 'pickup_time' })
    pickupTime!: string;

    @Column({ default: false })
    confirmed!: boolean;

}
