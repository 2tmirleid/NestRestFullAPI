import { Module } from "@nestjs/common";
import { UserModule } from "./users/user.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { RoleModule } from "./roles/role.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Role } from "./models/role.model";
import { UserRoles } from "./models/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { Post } from "./models/post.model";
import { PostModule } from "./posts/post.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      synchronize: true,
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),

    }),
    UserModule,
    RoleModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}