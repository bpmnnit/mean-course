const express = require('express');
const DprsController = require('../controllers/dprs');
const router = express.Router();

router.get("", DprsController.getDprs);
router.put("/update", DprsController.updateDrps);
module.exports = router;
