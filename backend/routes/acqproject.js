const express = require('express');
const AcqProjectController = require('../controllers/acqproject');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("", checkAuth,  AcqProjectController.createAcqProject);

module.exports = router;
