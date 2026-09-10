import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('login')
    login(@Body() body: { phoneNumber: string; password: string }) {
        return this.usersService.login(body.phoneNumber, body.password);
    }

    @Post('register')
    register(@Body() body: { phoneNumber: string; name: string; password?: string }) {
        return this.usersService.register(
            body.phoneNumber,
            body.name,
            body.password,
        );
    }

    @Patch(':id')
    updateField(
        @Param('id') id: number,
        @Body()
        body: {
            field: 'name' | 'phoneNumber' | 'password';
            value: string;
        }
    ) {
        return this.usersService.updateField(
            id,
            body.field,
            body.value
        );
    }

}