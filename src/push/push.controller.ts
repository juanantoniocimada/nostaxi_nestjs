import { Controller, Post, Body } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('push')  // Todas las rutas empiezan con /push
export class PushController {
  constructor(private readonly pushService: PushService) {}  // Inyecta el servicio

  @Post('test')  // Endpoint: POST /push/test
  async testPush(@Body() body: { token: string; title?: string; message?: string }) {
    const title = body.title || 'Test Push';
    const message = body.message || 'Hola, esta es una prueba';
    return this.pushService.sendPush(body.token, title, message);
  }
}