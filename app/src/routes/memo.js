const express = require("express");
const IDI = require("../controller/IDI_Controller");
const router = express.Router();

router.get("/", IDI.get_memo);
router.post("/", IDI.post_memo);
router.post("/write", IDI.post_writememo);

module.exports = router;
