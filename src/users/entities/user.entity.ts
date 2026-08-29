import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 30, unique: true })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password!: string | null;
}