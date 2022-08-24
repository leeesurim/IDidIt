const express = require("express");
const IDI = require("../controller/IDI_Controller");
const router = express.Router();

router.get('/', IDI.get_home);
router.get('/signup', IDI.get_signup);
router.get('/login', IDI.get_login);
router.get('/userInfo', IDI.get_IDIinfo);
router.post('/signup', IDI.post_signup);
router.post('/login', IDI.post_login);
router.post('/userInfo', IDI.post_userinfo);
router.patch('/userInfo/edit', IDI.patch_userinfo);
router.delete('/userInfo/delete', IDI.delete_userinfo);

module.exports = router;