import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "../dto/create.post.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() dto: CreatePostDto,
                   @UploadedFile() image) {
    return await this.postService.createPost(dto, image);
  }
}