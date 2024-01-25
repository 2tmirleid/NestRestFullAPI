import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../dto/create.user.dto";

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('/reg')
  async registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}