import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h',
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule,
  ]
})
export class AuthModule {}