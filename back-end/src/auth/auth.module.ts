/* eslint-disable prettier/prettier */
import {  Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule} from '@nestjs/mongoose';
import { AuthSchema, Auth } from './auth.schema';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ClientsModule.register([
      {
        name:"AuthService",
        transport:Transport.TCP
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
