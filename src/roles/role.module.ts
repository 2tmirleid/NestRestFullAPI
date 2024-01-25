import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import { UserRoles } from "../models/user-roles.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [
    RoleService
  ]
})
export class RoleModule {}