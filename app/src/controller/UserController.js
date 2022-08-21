const models = require('../model/index');
const bcrypt = require('bcrypt');
const salt = 10;

exports.get_home =  (req, res) => {
  res.render('home.ejs')
}

exports.get_signup =  (req, res) => {
  res.render('signup.ejs')
}

exports.get_login =  (req, res) => {
  res.render('login.ejs')
}

exports.post_signup =  async (req, res) => {
  let object = {
        id : req.body.id,
        password : await bcrypt.hash(req.body.password, salt),
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        nickname: req.body.nickname,
        phone_number: req.body.phone_number
    }
  models.User.create(object)
  .then((result) => {
    console.log(result);
    //res.render({result: result});
  })
}
exports.post_login =  async (req, res) => {
  models.User.findOne({
    where:{id: req.body.id}
  }).then((result) => {
    if (result){
      const password = bcrypt.compare(req.body.password, result.password)
      if (password) res.send(true);
    } 
    else res.send(false);
  }) 
}
    
  //res.render('login.ejs')



exports.post_userinfo = (req, res) => {
  models.User.findOne({
    where:{id: req.body.id}
  }).then((result) => {
    console.log('a : ', result)
    res.render('info.ejs',{data: result});
  })
}
// exports.post_userinfo = (req, res) => {
//   models.User.findOne({
//     where:{id: req.body.id}
//   }).then((result) => {
//     console.log('a : ', result.dataValues)
//     res.render('info.ejs',{data: [result.dataValues]});
//   })
// }

exports.patch_userinfo = (req, res) => {
  console.log('req.body :', req.body);
  let info = {
    id : req.body.id,
    password : req.body.password,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    nickname: req.body.nickname,
    phone_number: req.body.phone_number
  }
  models.User.update(info, {where: {id: req.body.id}})
    .then((result) => {
        console.log(result);
        res.send('수정성공');
    })
}

exports.get_userinfo = (req, res) => {
  res.render('info.ejs');
}

exports.delete_userinfo = (req, res) => {
  models.User.destroy({where: {id: req.body.id}})
    .then((result) => {
        console.log(result);
        res.send('삭제 성공');
    })
}
