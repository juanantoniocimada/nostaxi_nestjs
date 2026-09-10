import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async updateField(
        id: number,
        field: string,
        value: any
    ) {

        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const allowedFields = [
            'name',
            'phoneNumber',
            'password',
        ];

        if (!allowedFields.includes(field)) {
            throw new ConflictException(
                `Field '${field}' cannot be updated`
            );
        }

        if (value === undefined || value === null || value === '') {
            throw new ConflictException(
                'Value is required'
            );
        }

        user[field] = value;

        return this.userRepository.save(user);
    }

}