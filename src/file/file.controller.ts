import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(200)
  // @Auth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadfile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.fileService.saveFiles([file], folder);
  }
}
