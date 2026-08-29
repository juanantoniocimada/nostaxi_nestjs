import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber!: string;

  @Column()
  name!: string;

  @Column({ length: 255, nullable: true })
  password!: string | null;
}