import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';

@Module({
  controllers: [PushController],  // Registra el controlador
  providers: [PushService],       // Registra el servicio
  exports: [PushService],         // Permite usar PushService en otros módulos
})
export class PushModule {}