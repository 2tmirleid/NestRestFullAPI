import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "../dto/create.role.dto";

@Controller('/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }

  @Get('/:value')
  async getRoleByValue(@Param('value') value: string) {
    return await this.roleService.getRoleByValue(value);
  }
}