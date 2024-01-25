import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import { FileModule } from "../files/file.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FileModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [

  ]
})
export class PostModule {}