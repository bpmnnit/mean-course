const express = require('express');
const AtlasController = require('../controllers/atlas');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const router = express.Router();

router.post("", checkAuth, extractFile, AtlasController.createAtlas);

module.exports = router;
