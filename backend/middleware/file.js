const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if(isValid) {
      error = null;
    }
    if(file.fieldname === 'locationMapImage') {
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images/locationMapImages");
    } else if(file.fieldname === 'foldMapImage') {
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images/foldMapImages");
    } else if(file.fieldname === 'inlineImage'){
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images/inlineImages");
    } else if(file.fieldname === 'xlineImage') {
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images/xlineImages");
    } else if(file.fieldname === 'timeSliceImage') {
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images/timeSliceImages");
    } else {
      console.log(file.name);
      console.log(file.originalname);
      console.log(file.fieldname);
      console.log(file.mimetype);
      cb(error, "backend/images"); // this path is relative to your server.js file
    }
  },
  filename: (req, file, cb) => {
    console.log(file.name);
    console.log(file.originalname);
    const name = file.originalname.toLowerCase().split(' ').join('-');
    console.log(name);
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({storage: storage});
