/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res, Version } from '@nestjs/common';
import { postDto } from 'src/dto/post.dto';
import { PostService } from 'src/services/post.service';

@Controller('post')
export class PageController {
  constructor(private postService: PostService) {}

  @Version('1')
  @Post('createPost')
  async createPost(@Res() res, @Body() postCreateData: postDto) {
    console.log(postCreateData);
    const { mediaFile, ...postData } = postCreateData;
    const newPost = await this.postService.createNewPost(postData, mediaFile);
    if (!newPost) return res.status(401).json({ message: 'create fail' });
    return res
      .status(200)
      .json({ message: 'Create post sucsses', data: newPost });
  }
}
