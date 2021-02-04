import multer from 'multer';

import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);

export default upload.single('file');
