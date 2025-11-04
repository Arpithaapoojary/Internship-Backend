import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    // console.log(file);

    const uniqueSuffix = Date.now();

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );

    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:

  if (
    file.mimetype.includes("image/png") ||
    file.mimetype.includes("image/jpeg") ||
    file.mimetype.includes("image/jpg")
  ) {
    cb(null, true);
  } else {
    // To accept the file pass `true`, like so:
    cb(null, false);

    // You can always pass an error if something goes wrong:
    cb(new Error("only png,jpg and jpeg file"));
  }
};

let maxSize = 1024 * 1024 * 2;
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});

export default upload;
