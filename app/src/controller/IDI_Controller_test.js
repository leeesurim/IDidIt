const models = require('../model/index');
const bcrypt = require('bcrypt');
const { response } = require('../..');
const salt = 10;

// 회원 가입
exports.get_home = (req, res) => {
  if (req.session.user == null){
    res.render('main');
  } else {
    res.redirect('dashboard');
  }
}
  

// exports.get_home = (req, res) => {
//   if ( req.session.user == null ) { this.get_login( req, res ) }
//   else {
//     const memo = models.Memo.findAll();
//     res.render('main',{data:memo});
//   }
//   function get_login(req,res) {
//     res.render('home');
//   }
// }

exports.get_signup = (req, res) => {
  // 회원가입 페이지 렌더링
  if (!req.session.user){
    res.render('signup');
  } else {
    res.redirect('dashboard');
  }
};

exports.get_dashboard = (req, res) => {
  // 대시보드 페이지 렌더링
  // 로그인 시 회원의 정보 대시보드 페이지에 넣어줘야 함
  if (!req.session.user){
    res.redirect('/');
  } else {
    res.render('dashboard');
  }
  };


exports.post_signup = async (req, res) => {
  let object = {
    id: req.body.id,
    password: await bcrypt.hash(req.body.password, salt),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    nickname: req.body.nickname,
    phone_number: req.body.phone_number,
  };
  models.User.create(object).then((result) => {
    console.log(result);
    //res.render({result: result});
  });
};

// 로그인
exports.get_login = (req, res) => {
  if (!req.session.user){
    res.render('login');
  } else {
    res.redirect('dashboard');
  }
};
    

exports.post_login = (req, res) => {
  models.User.findOne({
    where: { id: req.body.id },
  }).then(async (id) => {
    if (!id) return res.send(false);
    const password = await bcrypt.compare(req.body.password, id.password)
    if (password) {
      console.log(req.session);
      req.session.user = id.id
      req.session.save(function(){
        res.send(true);
      });
    } else res.send(false);
  });
};

    


//res.render('login.ejs')

// 로그아웃
exports.get_logout = (req, res) => {
  req.session.destroy(function(err){
  res.redirect('/');
  })
};

// 회원 정보 조회
exports.get_userinfo = (req, res) => {
  if (req.session.user == null) res.render('main');
  else{
    console.log(req.session.user);
    models.User.findOne({
    where: { id: req.session.user},
    }).then((result) => {
    console.log('-------', result)
    res.render("modify.ejs", { data: result });
    })
  }
};

// 회원 정보 수정
exports.patch_userinfo = (req, res) => {
  console.log("req.body :", req.body);
  let info = {
    id: req.body.id,
    name: req.body.name,
    nickname: req.body.nickname,
    phone_number: req.body.phone_number,
    gender: req.body.gender
  };
  models.User.update(info, { where: { id: req.body.id } }).then((result) => {
    console.log(result);
    res.send("수정성공");
  });
};

// 회원 정보 삭제
exports.delete_userinfo = (req, res) => {
  models.User.destroy({ where: { id: req.body.id } }).then((result) => {
    console.log(result);
    res.send("삭제 성공");
  });
};



// 메모 작성
exports.get_memo = (req, res) => {
  res.render("memo.ejs");
};
// exports.post_memo = (req, res) => {
//   // res.render('memo.ejs');
// };

// exports.post_login = (req, res) => {
//   //   로그인
//   const result = models.Memo.findAll();
//   res.render("main.ejs", { data: result });
// };

// 달력
exports.get_calendar = (req, res) => {
  res.render("calendar.ejs");
};

exports.post_calendar = (req, res) => {
  let object = {
    id: req.body.id,
    title: req.body.title,
    date: req.body.date,
    info: req.body.info,
  };
  models.User.create(object).then((result) => {
    console.log(result);
    res.render({result: result});
  });
}

// // 가계부
exports.get_accountbook = (req, res) => {
  res.render("accountbook.ejs");
};

exports.post_accountbook = (req, res) => {
  const memo = models.Memo.findOne({where: { id: req.body.id}});
  const account = models.Account.findOne({where: { id: req.body.id}});
//     res.render('main',{data:memo});
  res.render("accountbook.ejs", {memo : memo, account : account});
};
