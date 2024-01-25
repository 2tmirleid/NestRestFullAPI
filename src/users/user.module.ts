import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

import { User } from "../models/user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../models/role.model";
import { UserRoles } from "../models/user-roles.model";
import { RoleModule } from "../roles/role.module";
import { AuthModule } from "../auth/auth.module";
import { Post } from "../models/post.model";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    UserService,
  ]
})
export class UserModule {}