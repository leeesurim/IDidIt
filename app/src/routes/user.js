const express = require("express");
const IDI = require("../controller/IDI_Controller");
const router = express.Router();

// get 처리 라우팅
router.get("/", IDI.get_home);
router.get("/signup", IDI.get_signup);
router.get("/login", IDI.get_login);
// 로그인 후 메인 페이지
router.get("/dashboard", IDI.get_dashboard);
router.get("/get_data", IDI.get_dashboard_data);

// 로그아웃 후 메인페이지
router.get("/logout", IDI.get_logout);

// 마이페이지
router.get("/userinfo", IDI.get_userinfo);



// 일정

// post 처리 라우팅
router.post("/", IDI.get_home);
router.post("/signup", IDI.post_signup);
router.post("/login", IDI.post_login);
// router.post("/userInfo", IDI.post_userinfo);
// 회원 정보 수정
router.patch("/userInfo/edit", IDI.patch_userinfo);
// 회원 탈퇴
router.delete("/userInfo/delete", IDI.delete_user);


module.exports = router;
