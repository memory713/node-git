var express = require('express')
var router = express.Router()

var User = require('../models/user')

// 统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData = {
		code:0,
		message:""
	}
	next()
})
// 用户注册
// 注册逻辑：
// 1.用户名不能为空 密码不能为空 两次密码是否一致
// 用户名是否已经注册
router.post('/user/register',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	// 用户是否为空
	if(username == ""){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}
	// 用户是否为空
	if(password == ""){
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	// 两次输入的密码不一致
	if(password !== repassword){
		responseData.code = 3;
		responseData.message = '两次密码不一致';
		res.json(responseData);
		return;
	}

	// 用户名是否已经被注册
	User.findOne({
		username:username
	}).then(function(userInfo){
		console.log(userInfo)
		if(userInfo){
			// 表示数据库中有该数据
			responseData.code=4
			responseData.message = '用户名已经被注册'
			res.json(responseData)
			return
		}
		// 保存用户信息到数据库中
		var user = new User({
			username:username,
			password:password

		});
		return user.save()

	}).then(function(newUserInfo){
		console.log(newUserInfo)
		responseData.message = '注册成功'
		res.json(responseData)

	})
	

})

module.exports = router;