// 加载express模块
var express = require('express')
// 加载模版处理模块
var swig = require('swig')
// 定义数据库模块
var mongoose = require('mongoose')
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 创建app应用=>NODEJS http.creatServer()
var app = express()

// 设置静态文件托管
// 当用户访问的URL以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public',express.static(__dirname + '/public'))


// 配置用用模版
// 定义当前应用所使用的模版引擎
// 第一个参数：模版引擎的名称，同时也是模版文件的后缀,第二个参数表示处于解析处理模版内容的方法
app.engine('html',swig.renderFile)
// 设置模版文件存放目录，第一个参数必须是views,第二个参数是目录
app.set('views','./views')
// 注册所使用的模版引擎，第一个参数必须是view engine,第二个参数和app.engine这个方法中定义的模版引擎额名称（第一个参数是一致的）
app.set('view engine','html')
// 在开发过程中，需要取消模版缓存
swig.setDefaults({cache:false})
// bodyparser设置
app.use(bodyParser.urlencoded({extended:true}))

// 根据不同的功能划分模块
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))

// // 首页
// // req:request对象
// // res response对象
// // next 函数
// app.get('/',function(req,res,next){
// 	// 读取views目录下的指定文件，解析并返回给客户端
// 	// 第一个参数：表示模板的文件，相对于views目录
// 	// 第二个参数：传递给模版使用的数据
// 	res.render('index')

// })



// 监听http请求
mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err){
		console.log("数据库连接失败")
	}else{
		console.log("数据库连接成功")
		app.listen(8081);
	}

})


// 用户发送HTTP请求->url->解析路由->找到匹配的规则->执行指定的绑定函数，返回对应内容至用户
// public->静态->直接读取指定目录下的文件，返回给用户->动态->处理业务逻辑，加载模版，解析模版->返回数据给用户