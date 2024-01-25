import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "../models/post.model";
import { CreatePostDto } from "../dto/create.post.dto";
import { FileService } from "../files/file.service";

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileService: FileService) {}

  async createPost(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName })
    return post;
  }
}