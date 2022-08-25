const express = require("express");
const IDI = require("../controller/IDI_Controller");
const router = express.Router();

// get 처리 라우팅
router.get("/", IDI.get_home);
router.get("/signup", IDI.get_signup);
router.get("/login", IDI.get_login);
// 로그인 후 메인 페이지
router.get("/dashboard", IDI.get_IDIinfo);
// 개인정보변경
router.get("/userinfo", IDI.get_userinfo);
// 일정

//

// post 처리 라우팅
router.post("/signup", IDI.post_signup);
router.post("/login", IDI.post_login);
router.post("/userInfo", IDI.post_userinfo);
router.patch("/userInfo/edit", IDI.patch_userinfo);
router.delete("/userInfo/delete", IDI.delete_userinfo);

module.exports = router;
