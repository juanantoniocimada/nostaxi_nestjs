import { TaxiInterest } from 'src/taxi-interest/entities/taxi-interest.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('taxi_geo')
export class TaxiGeo {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  taxi_id!: number;

  @Column({ length: 50 })
  latitude!: string;

  @Column({ length: 50 })
  longitude!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => TaxiInterest, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'taxi_id' })
  taxi!: TaxiInterest;
}