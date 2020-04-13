### 1.使用的软件：vscode

```shell
# 初始化项目路径
cnpm init
# 创建app.js
touch app.js
# 本地安装express
cnpm install express --save
# 处理参数
cnpm install body-parser --save
```

每次修改代码后都需要重启服务器，为了解决这个问题，引入了nodemon模块
安装命令：`cnpm install nodemon --save`

```javascript
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
app.get('/async1', (req, res) => {
  res.send('hello1')
})
app.get('/async2', (req, res) => {
  if (req.query.info == 'hello') {
    res.send('world')
  } else {
    res.send('error')
  }
})

app.get('/adata', (req, res) => {
  res.send('Hello axios!')
})
app.get('/axios', (req, res) => {
  res.send('axios get 传递参数' + req.query.id)
})
app.get('/axios/:id', (req, res) => {
  res.send('axios get (Restful) 传递参数' + req.params.id)
})
app.delete('/axios', (req, res) => {
  res.send('axios get 传递参数' + req.query.id)
})
app.post('/axios', (req, res) => {
  res.send('axios post 传递参数' + req.body.uname + '---' + req.body.pwd)
})
app.put('/axios/:id', (req, res) => {
  res.send('axios put 传递参数' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

app.get('/axios-json', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 12
  });
})


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

app.get('/json', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 13,
    gender: 'male'
  });
})

app.get('/a1', (req, res) => {
  setTimeout(function () {
    res.send('Hello TOM!')
  }, 1000);
})
app.get('/a2', (req, res) => {
  setTimeout(function () {
    res.send('Hello JERRY!')
  }, 2000);
})
app.get('/a3', (req, res) => {
  setTimeout(function () {
    res.send('Hello SPIKE!')
  }, 3000);
})

// 路由
app.get('/data', (req, res) => {
  res.send('Hello World!')
})
app.get('/data1', (req, res) => {
  setTimeout(function () {
    res.send('Hello TOM!')
  }, 1000);
})
app.get('/data2', (req, res) => {
  res.send('Hello JERRY!')
})

// 启动监听
app.listen(3000, () => {
  console.log('running...')
})
```



将重启nodemon的命令配置到package.json中：如下

```javascript
{
  "name": "express-server",
  "version": "1.0.0",
  "description": "express-server",
  "main": "app.js",
  "scripts": {
    //自定义的一些npm运行脚本配置在scripts里面
    "dev": "nodemon app.js ",
    "start": "node app.js"
  },
  "keywords": [
    "express"
  ],
  "author": "valtenhyl",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "nodemon": "^2.0.3"
  }
}
```



再次运行时，只需输入npm run dev，此命令相当于nodemon app.js
输入npm run start或者npm start相当于node app.js
注：只有start命令可以直接npm start，其它的必须加run
