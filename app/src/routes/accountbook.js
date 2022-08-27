const express = require("express");
const IDI = require("../controller/IDI_Controller");
const router = express.Router();

// get 처리 라우팅
// 가계부
router.get("/", IDI.get_accountbook);

// post 처리 라우팅

module.exports = router;
