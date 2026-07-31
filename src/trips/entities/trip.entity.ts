
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

    @Column('decimal', {
    name: 'taxi_latitude',
    precision: 10,
    scale: 7,
    nullable: true,
    })
    taxiLatitude!: number;

    @Column('decimal', {
    name: 'taxi_longitude',
    precision: 10,
    scale: 7,
    nullable: true,
    })
    taxiLongitude!: number;

}
