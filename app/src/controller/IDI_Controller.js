const models = require("../model/index");
const bcrypt = require("bcrypt");
const salt = 10;

// 회원 가입
exports.get_home = (req, res) => {
  if (req.session.user == null) {
    // 세션의 정보가 없을 경우
    res.render("main");
    // this.get_login(req, res);
  } else {
    // 세션의 정보가 있을 경우 (로그인을 했을 경우)
    const memo = models.Memo.findAll();
    res.render("main", { data: memo });
  }
  // 로그인 페이지 함수 작성
  function get_login(req, res) {
    res.render("login");
  }
};

exports.get_signup = (req, res) => {
  // 회원가입 페이지 렌더링
  res.render("signup.ejs");
};

exports.get_IDIinfo = (req, res) => {
  // 대시보드 페이지 렌더링
  // 로그인 시 회원의 정보 대시보드 페이지에 넣어줘야 함
  res.render("dashboard");
};

exports.get_dashboard_data = (req, res) => {
  // 대시보드 페이지 렌더링시 axios를 통해 보내지는 데이터들
  // 임시 데이터 json 형태로 작성
  let data = {
    accountbook: [
      [2478, 5267, 734, 784, 433],
      [4000, 2000, 3000, 1500, 5000],
    ],
    memo: [
      { date: "2022-03-06", title: "제목 1", content: "내용 1" },
      { date: "2022-03-07", title: "제목 2", content: "내용 2" },
      { date: "2022-03-08", title: "제목 3", content: "내용 3" },
    ],
  };
  // 로그인 시 회원의 정보 대시보드 페이지에 넣어줘야 함ss
  // 근영님 로직 작성 필요

  res.send(data);
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
  res.render("login.ejs");
};

exports.post_login = (req, res) => {
  console.log(req);
  models.User.findOne({
    where: { id: req.body.id },
  }).then(async (id) => {
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
  // 회원 정보 불러오는 로직 필요
  res.render("modify.ejs");
};

exports.post_userinfo = (req, res) => {
  models.User.findOne({
    where: { id: req.body.id },
  }).then((result) => {
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
    phone_number: req.body.phone_number,
  };
  models.User.update(info, { where: { id: req.body.id } }).then((result) => {
    console.log(result);
    res.send("수정성공");
  });
};

// 삭제
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

// 메모 페이지 메모들 불러오기
exports.get_memoes = (req, res) => {
  // 회원 user_id에 따른 메모들 select 로직 작성 필요
  // write here
  console.log(req.body.day);
  // 임시 데이터
  let data = {
    memo: [
      {
        id: 1,
        title: "임시 데이터 제목1",
        content: "임시 데이터 내용1",
        date: "2022-01-03",
      },
      {
        id: 2,
        title: "임시 데이터 제목2",
        content: "임시 데이터 내용2",
        date: "2022-01-04",
      },
      {
        id: 3,
        title: "임시 데이터 제목3",
        content: "임시 데이터 내용3",
        date: "2022-01-05",
      },
      {
        id: 4,
        title: "임시 데이터 제목4",
        content: "임시 데이터 내용4",
        date: "2022-01-03",
      },
    ],
  };

  res.send(data);
};

// 달력 페이지에서 모달을 띄울 때 메모들과 가계부를 불러오는 함수 입니다.
exports.post_calendar_modal_data = (req, res) => {
  // where절로 사용할 날짜
  let day = req.body.day;
  let user_id = req.body.user_id;
  console.log(user_id);
  // 임시 데이터
  let data = {
    memo: [
      {
        id: 1,
        title: "임시 데이터 제목1",
        content: "임시 데이터 내용1",
        date: "2022-08-19",
      },
      {
        id: 2,
        title: "임시 데이터 제목2",
        content: "임시 데이터 내용2",
        date: "2022-08-19",
      },
      {
        id: 3,
        title: "임시 데이터 제목3",
        content: "임시 데이터 내용3",
        date: "2022-08-19",
      },
      {
        id: 4,
        title: "임시 데이터 제목4",
        content: "임시 데이터 내용4",
        date: "2022-08-19",
      },
    ],
    accountbook: [{}],
  };
  // 데이터 불러 오는 모델 로직 작성

  // models.Memo.findAll({ where: { date: day } }).then((result) => {
  //   console.log(result);
  //   res.render({ result: result });
  // });

  res.send(data);
};

exports.post_calendar_calendar_data = (req, res) => {
  // where절로 사용할 데이터
  let user_id = req.body.user_id;
  let start_day = req.body.start_day;
  let end_day = req.body.end_day;

  // 임시 데이터
  let data = {
    memo: [
      {
        id: 1,
        title: "임시 데이터 제목1",
        content: "임시 데이터 내용1",
        date: "2022-8-19",
      },
      {
        id: 2,
        title: "임시 데이터 제목2",
        content: "임시 데이터 내용2",
        date: "2022-8-19",
      },
      {
        id: 3,
        title: "임시 데이터 제목3",
        content: "임시 데이터 내용3",
        date: "2022-8-19",
      },
      {
        id: 4,
        title: "임시 데이터 제목4",
        content: "임시 데이터 내용4",
        date: "2022-8-27",
      },
    ],
    accountbook: [
      { id: 1, date: "2022-8-19" },
      { id: 2, date: "2022-8-20" },
      { id: 3, date: "2022-8-19" },
      { id: 4, date: "2022-8-22" },
      { id: 5, date: "2022-8-27" },
    ],
  };
  // 데이터 불러 오는 모델 로직 작성

  // models.Memo.findAll({ where: { date: day } }).then((result) => {
  //   console.log(result);
  //   res.render({ result: result });
  // });

  res.send(data);
};

exports.post_memo = (req, res) => {
  // res.render('memo.ejs');
};

exports.post_writememo = (req, res) => {
  // 제목, 날짜, html화 된 내용,
  let memo_title = req.body.title;
  let memo_date = req.body.date;
  let memo_content = req.body.content;

  console.log("제목 : " + memo_title);
  console.log("날짜 : " + memo_date);
  console.log("내용 : " + memo_content);
};

// 메모 수정
exports.post_modifymemo = (req, res) => {
  // 제목, 날짜, html화 된 내용,
  let memo_id = req.body.id;
  let memo_title = req.body.title;
  let memo_date = req.body.date;
  let memo_content = req.body.content;

  console.log("제목 : " + memo_title);
  console.log("날짜 : " + memo_date);
  console.log("내용 : " + memo_content);
};

// 메모 삭제 기능
exports.post_deletememo = (req, res) => {
  let memo_id = req.body.id;
  res.send(true);
};

// 달력
exports.get_calendar = (req, res) => {
  res.render("calendar.ejs");
};

// 가계부
exports.get_accountbook = (req, res) => {
  res.render("accountbook.ejs");
};
