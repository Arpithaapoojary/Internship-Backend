import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export default upload;
