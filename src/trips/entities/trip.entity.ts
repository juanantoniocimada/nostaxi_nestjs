
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

    // nuevos campos 
    @Column({ name: 'user_origin_pos_name', type: 'varchar', length: 255, nullable: true })
    userOriginPosName!: string | null;

    @Column({ name: 'user_origin_pos_lat', type: 'decimal', precision: 10, scale: 7, nullable: true })
    userOriginPosLat!: number | null;

    @Column({ name: 'user_origin_pos_lng', type: 'decimal', precision: 10, scale: 7, nullable: true })
    userOriginPosLng!: number | null;

    @Column({ name: 'user_destination_pos_name', type: 'varchar', length: 255, nullable: true })
    userDestinationPosName!: string | null;

    @Column({ name: 'user_destination_pos_lat', type: 'decimal', precision: 10, scale: 7, nullable: true })
    userDestinationPosLat!: number | null;

    @Column({ name: 'user_destination_pos_lng', type: 'decimal', precision: 10, scale: 7, nullable: true })
    userDestinationPosLng!: number | null;

}
