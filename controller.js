/* eslint-disable node/no-deprecated-api */
/**
 * @author BillowsTao
 * @description 创建服务器并定义我们的 REST 端口
 */
const http = require('http')
const url = require('url')
module.exports = http.createServer((req, res) => {
  // 导入 service 模块
  var service = require('./service.js')
  const reqUrl = url.parse(req.url, true)
  // GET Endpoint
  if (reqUrl.pathname === '/sample' && req.method === 'GET') {
    // 处理地址以 /sample 为结束的 GET 请求
    console.log('Request Type:' +
      req.method + ' Endpoint: ' +
      reqUrl.pathname)
    service.sampleRequest(req, res)
  } else if (reqUrl.pathname === '/test' && req.method === 'POST') {
    // 处理地址以 /test 为结束的 POST 请求
    console.log('Request Type:' +
      req.method + ' Endpoint:' +
      reqUrl.pathname)
    // 调用 service 的 testRequest 业务逻辑
    service.testRequest(req, res)
  } else {
    // 处理无效的请求
    console.log('Request Type:' +
      req.method + ' Invalid Endpoint:' +
      reqUrl.pathname)
    service.invalidRequest(req, res)
  }
})
