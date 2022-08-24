const models = require("../model/index");
const bcrypt = require("bcrypt");
const salt = 10;

// 회원 가입
exports.get_home = (req, res) => {
  if (req.session.user == null) {
    this.get_login(req, res);
  } else {
    const memo = models.Memo.findAll();
    res.render("main", { data: memo });
  }
  function get_login(req, res) {
    res.render("home");
  }
};

exports.get_signup = (req, res) => {
  res.render("signup.ejs");
};

exports.post_signup = async (req, res) => {
  let object = {
    id: req.body.id,
    password: await bcrypt.hash(req.body.password, salt),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    nickname: req.body.nickname,
    phone_number: req.body.phone_number
  };
  models.User.create(object).then(result => {
    console.log(result);
    //res.render({result: result});
  });
};

// 로그인
exports.get_login = (req, res) => {
  res.render("dashboard.ejs");
};

exports.post_login = (req, res) => {
  models.User
    .findOne({
      where: { id: req.body.id }
    })
    .then(async id => {
      if (!id) return res.send(false);
      const password = await bcrypt.compare(req.body.password, id.password);

      if (password) {
        req.session.userID = id;
        // console.log( req );
        console.log("--------");
        console.log(req.session);
        console.log(req.sessionID);
        res.send(true);
        res.render("main.ejs");
      } else res.send(false);
    });
};

//res.render('login.ejs')

// 회원 정보 수정
exports.get_userinfo = (req, res) => {
  res.render("info.ejs");
};

exports.post_userinfo = (req, res) => {
  models.User
    .findOne({
      where: { id: req.body.id }
    })
    .then(result => {
      console.log("a : ", result);
      res.render("info.ejs", { data: result });
    });
};
// exports.post_userinfo = (req, res) => {
//   models.User.findOne({
//     where:{id: req.body.id}
//   }).then((result) => {
//     console.log('a : ', result.dataValues)
//     res.render('info.ejs',{data: [result.dataValues]});
//   })
// }

exports.patch_userinfo = (req, res) => {
  console.log("req.body :", req.body);
  let info = {
    id: req.body.id,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    nickname: req.body.nickname,
    phone_number: req.body.phone_number
  };
  models.User.update(info, { where: { id: req.body.id } }).then(result => {
    console.log(result);
    res.send("수정성공");
  });
};

// 삭제
exports.delete_userinfo = (req, res) => {
  models.User.destroy({ where: { id: req.body.id } }).then(result => {
    console.log(result);
    res.send("삭제 성공");
  });
};

// 메모 작성
exports.get_memo = (req, res) => {
  res.render("memo.ejs");
};
exports.post_memo = (req, res) => {
  // res.render('memo.ejs');
};
exports.post_login = (req, res) => {
  //   로그인
  const result = models.Memo.findAll();
  res.render("main.ejs", { data: result });
};
