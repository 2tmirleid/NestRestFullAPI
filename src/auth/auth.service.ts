import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../dto/create.user.dto";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService) {}
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if(candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({...dto, password: hashPass});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Uncorrected email or password' })
  }
}