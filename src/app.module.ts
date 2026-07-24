import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TaxiInterestModule } from './taxi-interest/taxi-interest.module';
import { TaxiGeoModule } from './taxi-geo/taxi-geo.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    VehiclesModule,
    TaxiInterestModule,
    TaxiGeoModule,
    TripsModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}