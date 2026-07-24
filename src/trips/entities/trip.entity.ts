

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('trips')
export class Trip {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    driverName!: string;

    @Column()
    plate!: string;

    @Column()
    pickupTime!: string;

    @Column({ default: false })
    confirmed!: boolean;

}