import { Injectable } from "@nestjs/common";
import { Role } from "../models/role.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "../dto/create.role.dto";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } })
  }
}