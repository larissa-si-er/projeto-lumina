import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// @Controller('projects')
// export class UploadController {
//   @Post('upload')
//   @UseInterceptors(
//     FilesInterceptor('files', 10, {
//       storage: diskStorage({
//         destination: './uploads', // Diretório para salvar os arquivos
//         filename: (req, file, callback) => {
//           const uniqueSuffix =
//             Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//         },
//       }),
//     }),
//   )
//   uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
//     const urls = files.map(
//       (file) => `http://localhost:3000/uploads/${file.filename}`,
//     );
//     return urls;
//   }
// }
@Controller('projects')
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads', // Diretório para salvar os arquivos
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Gerar URLs para os arquivos enviados
    const urls = files.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`,
    );
    return { urls }; // Retorna as URLs em um objeto
  }
}
