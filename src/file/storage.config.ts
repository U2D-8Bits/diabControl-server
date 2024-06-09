/* eslint-disable prettier/prettier */
import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({
    destination: "./../../pdfs",
    filename: ( req, file, cb) => {
        cb(null, generateFileName(file));
    }
})

function generateFileName(file){
    return `${Date.now()}.${extname(file.originalname)}`;
}