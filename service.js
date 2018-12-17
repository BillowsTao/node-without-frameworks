/* eslint-disable node/no-deprecated-api */
/**
 * @author BillowsTao
 * @description 业务逻辑处理
 */
const url = require('url')
// 处理请求服务 sampleRequest
exports.sampleRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true)
  var name = 'World'
  if (reqUrl.query.name) {
    name = reqUrl.query.name
  }
  var response = {
    'text': 'Hello ' + name
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(response))
}

// 处理请求服务 testRequest
exports.testRequest = function (req, res) {
  /* global body */
  // eslint-disable-next-line no-global-assign
  body = ''
  req.on('data', function (chunk) {
    // eslint-disable-next-line no-global-assign
    body += chunk
  })
  req.on('end', function () {
    /* global postBody */
    // eslint-disable-next-line no-global-assign
    postBody = JSON.parse(body)
    var response = {
      'text': 'Post Request value is ' + postBody.value
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response))
  })
}

// 处理请求服务 invalidRequest
exports.invalidRequest = function (req, res) {
  // 设置请求返回状态码为 404
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Invalid Request!')
}
