const express = require('express') // 引入express
const app = express()              // 实例化express
const bodyParser = require('body-parser')   // 引入body-parser
const Mock = require('mockjs')              // 引入Mokcjs

// 设置静态资源目录，表示所有的请求使用静态资源目录，浏览器访问时，先访问此目录，“public”表示当前服务器的public目录
app.use(express.static('public'))
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'mytoken');
  next();
});

// http://localhost:3000/async1
app.get('/async1', (req, res) => {
  res.send('hello1')
})

// http://localhost:3000/async2?info=hello
app.get('/async2', (req, res) => {
  if (req.query.info == 'hello') {
    res.send('world')
  } else {
    res.send('error')
  }
})
// 不同请求方式，获取参数
app.get('/fdata', (req, res) => {
  res.send('Hello Fetch!')
})
app.get('/books', (req, res) => {
  res.send('传统的URL传递参数!' + req.query.id)
})
app.get('/books/:id', (req, res) => {
  res.send('Restful形式的URL传递参数!' + req.params.id)
})
app.delete('/books/:id', (req, res) => {
  res.send('DELETE请求传递参数!' + req.params.id)
})
app.post('/books', (req, res) => {
  res.send('POST请求传递参数!' + req.body.uname + '---' + req.body.pwd)
})
app.put('/books/:id', (req, res) => {
  res.send('PUT请求传递参数!' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

// 定时返回
app.get('/data1', (req, res) => {
  setTimeout(function () {
    res.send('Hello TOM!')
  }, 1000);
})

// 返回json
app.get('/json', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 13,
    gender: 'male'
  });
})

// 使用Mock生成动态数据 需要引入 mockjs 
// const Mock = require('mockjs');
// 获取用户列表
app.get('/api/users', (req, res) => {
  res.json(Mock.mock({
      'code': 200,
      'data|10-30': [{
          'id|+1': 1000,
          'age|18-24': 15,
          'gender|1': ['0', '1'],
          'email': '@email',
          'phone': /(13|14|15|18|17)[0-9]{9}/,
          'birthday': '@date(yy-mm-dd)',
          'address': '@county(true)',
          'desc': '@cparagraph'
      }]        
  }));
})

// 根据id获取用户信息
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params
  res.json(Mock.mock({
      'code': 200,
      'data': {
          'id|+1': id,
          'age|18-24': 15,
          'gender|1': ['0', '1'],
          'email': '@email',
          'phone': /(13|14|15|18|17)[0-9]{9}/,
          'birthday': '@date(yy-mm-dd)',
          'address': '@county(true)',
          'desc': '@cparagraph'
      }        
  }));
})


// 启动监听
app.listen(3000, () => {
  console.log('running...')
})