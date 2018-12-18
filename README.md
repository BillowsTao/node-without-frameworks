# 无框架和外部依赖的情况下构建 REST API

## 前提

本项目需要安装 NodeJS，从 [https://nodejs.org](https://nodejs.org) 安装 NodeJS

## 运行方式

安装 npm 依赖库

```bash
npm install
```

运行项目

```bash
node server.js
```

## 项目说明

### server.js

- 项目的启动文件，定义了监听端口与地址。
- 服务器需要在地址 `localhost` 上监听 `3000` 端口，服务器的创建是在 `controller.js` 中完成的。

### controller.js

- 服务器的路由与跳转逻辑控制，在此定义了 REST API。
- `url` 模块帮助解析 URL。`http.createServer((req, res) => {...}` 使用 `request` 即 `req` 和 `response` 即 `res` 创建一个 HTTP 服务器。`module.exports` 用于把这个文件作为一个模块导出，以便可以在  `server.js` 中使用 `const server = require('./controller.js')` 导入  `controller.js`
- `const reqUrl = url.parse(req.url, true)`  获取请求 URL 并解析，以便我们可以在上面运行一些 URL 函数。
- 采用 `if else` 进行路由跳转判断，`if (reqUrl.pathname == '/sample' && req.method==='GET')` 会检查请求的 URL 是否是 `/sample`，也会检查请求类型是否是 `GET`。`GET` 请求的逻辑在 `service.sampleRequest(req, res)` 中，这是一个在文件 `service.js` 中定义的函数，其他判断逻辑同理。

### service.js

- 实现 API 业务逻辑
- `exports.sampleRequest` 会检查请求 URL 是否有一个名为 `name` 的参数，并保存在 `name` 变量中。如果没有提供这个参数，则默认为字符串 "World"。应答状态设置为 `200`，响应的 `Content Type` 是 `JSON`，最后，使用 `res.end(JSON.stringify(response))` 返回响应。由于 `response` 变量是一个 `JSON` 对象，在返回 HTTP 响应之前，我们使用 `JSON.stringify` 将其转换成字符串。
- `exports.testRequest` 的 `POST` 端点的 URL 为 `/test`。这段代码有一个条件用于检查 `/test` 端点。`/test` 端点的逻辑在 `service.testRequest(req, res)` 中，该函数是在 `service.js` 中定义的。这段代码还有一个针对无效路由的 `else` 条件。这段针对无效路由的逻辑在函数 `service.invalidRequest(req, res)` 中进行处理。
- `exports.invalidRequest` 对于无效请求，响应状态置为 `404`，`Content-Type` 置为 `text/plain`。返回的具体内容是 `Invalid Request`。

## 测试

需要使用 Postman 进行测试，可以从 [https://www.getpostman.com](https://www.getpostman.com) 下载。

- 在 Postman 中选择 `GET` 请求，输入以下 URL，点击请求

```text
http://localhost:3000/sample?name=BillowsTao
```

该请求的输出如下：

```json
{
    "text": "Hello BillowsTao"
}
```

- 在 Postman 中选择 `GET` 请求，输入以下 URL，点击请求

```text
http://localhost:3000/sample
```

该请求的输出如下：

```json
{
    "text": "Hello World"
}
```

- 在 Postman 中选择 `POST` 请求，输入以下 URL，点击请求，选择 `Body` , `raw` ,输入 `Body`，并点击请求

```json
// URL:
    http://localhost:3000/test

// Body:
{
    "value" : "nodejs"
}
```

输出如下：

```json
{
    "text": "Post Request Value is nodejs"
}
```

- 无效请求，在 Postman 中选择 `GET` ,并输入 URL 请求

```text
http://localhost:3000/test1234
```

输出如下：

```text
Invalid Request!
```

原文参考:[https://adityasridhar.com/posts/how-to-use-nodejs-without-frameworks-and-external-libraries](https://adityasridhar.com/posts/how-to-use-nodejs-without-frameworks-and-external-libraries)