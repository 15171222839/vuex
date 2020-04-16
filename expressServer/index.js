const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
  //使用cors跨域中间件
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * 使用express框架启动一个服务器
 */
//1.读取数据
var appData=require('./data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;

//2.使用expresss配置路由，指定接口请求
var apiRoutes=express.Router(); //定义一个路由，可挂载路由处理程序

// 路由器的中间件
apiRoutes.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

//配置请求路由和响应
apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0, //错误码
    data:seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0, //错误码
    data:goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno:0, //错误码
    data:ratings
  });
});

app.use('/api',apiRoutes); //暴露API接口

app.route('/info')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


app.listen(3003, () => console.log('Example app listening on port 3003!'))