import { Request, Express } from "express";
import multer, { FileFilterCallback } from "multer";
// import sharp from "sharp";

const storage = multer.diskStorage({
  destination: function(req: Request, file: Express.Multer.File,
               callback: (error: Error | null, destination:string)=> void){
                callback(null, "uploads");
              },
  filename: function(req: Request, file: Express.Multer.File,
            callback: (error: Error | null, destination:string)=> void){
              callback(null, `${Date.now()}-${file.originalname}`)
            },
});

// const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback):void=>{
  if(file.mimetype.startsWith("image")){
    callback(null, true)
  }else{
    callback(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1000000
  }
})

const uploadImage = upload.single("image");

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * Middleware for image processing
 */
// function resizeImage(req: Request, res:Response, next:NextFunction){
//   if(!req.file) return next();

//   console.log(req.file.originalname);

//   sharp(req.file.buffer)
//   .resize(500, 500)
//   .toFormat("jpeg")
//   .jpeg({ quality:90 })
//   .toFile("../uploads");

//   next();
// }

export { uploadImage }