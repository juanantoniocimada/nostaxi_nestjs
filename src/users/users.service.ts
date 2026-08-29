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

        if (!user.password || user.password !== password) {
            return { ok: false, message: 'Contraseña incorrecta' };
        }

        return {
            ok: true,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                name: user.name,
            },
        };
    }

    async register(phoneNumber: string, name: string, password?: string) {
        const normalizedPhone = phoneNumber?.trim();
        const normalizedName = name?.trim();

        if (!normalizedPhone) {
            throw new ConflictException('Phone number is required');
        }

        if (!normalizedName) {
            throw new ConflictException('Name is required');
        }

        const existingUser = await this.userRepository.findOne({
            where: { phoneNumber: normalizedPhone },
        });

        if (existingUser) {
            throw new ConflictException('Phone number already registered');
        }

        const user = this.userRepository.create({
            phoneNumber: normalizedPhone,
            name: normalizedName,
            password: password ?? null,
        });

        return this.userRepository.save(user);
    }

}