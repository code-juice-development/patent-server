import multer from 'multer';
import path from 'path';

const uploadConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (_request, file, callback) => {
      const extensao = path.extname(file.originalname);
      const name = path.basename(file.originalname, extensao);

      callback(null, `${name}-${Date.now()}${extensao}`);
    },
  }),
};

export default uploadConfig;
