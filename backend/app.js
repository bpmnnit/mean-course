const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
//const upload = multer();
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/node-angular", { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('connection failed!');
  });

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // body-parser is deprecated and does not parse multipart/form-data
app.use("/images", express.static(path.join("backend/images"))); // allows to access the /images static contents folder
//app.use(upload.array()); // for parsing multipart/form-data

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const dprRoutes = require('./routes/dprs');
const atlasRoutes = require('./routes/atlas');
const acqProjectRoutes = require('./routes/acqproject');

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dprs", dprRoutes);
app.use("/api/atlas", atlasRoutes);
app.use("/api/apc", acqProjectRoutes);

module.exports = app;
