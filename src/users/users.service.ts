import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async login(phoneNumber: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { phoneNumber },
        });

        if (!user) {
            return { ok: false, message: 'Usuario no encontrado' };
        }

        if (user.password !== password) {
            return { ok: false, message: 'Contraseña incorrecta' };
        }

        return {
            ok: true,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
            },
        };
    }

    async register(phoneNumber: string, name: string) {

        const existingUser = await this.userRepository.findOne({
            where: { phoneNumber },
        });

        if (existingUser) {
            throw new ConflictException('Phone number already registered');
        }

        const user = this.userRepository.create({
            phoneNumber,
            name,
        });

        return this.userRepository.save(user);
    }

}