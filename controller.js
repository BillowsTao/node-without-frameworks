/**
 * @author BillowsTao
 * @description 创建服务器并定义我们的 REST 端口
 */
const http = require('http')
const url = require('url')
module.exports = http.createServer((req, res) => {
  var service = require('./service.js')
  const reqUrl = url.parse(req.url, true)
  // GET Endpoint
  if (reqUrl.pathname === '/sample' && req.method === 'GET') {
    console.log('Request Type:' +
      req.method + ' Endpoint: ' +
      reqUrl.pathname)
    service.sampleRequest(req, res)
  } else if (reqUrl.pathname === '/test' && req.method === 'POST') {
    console.log('Request Type:' +
      req.method + ' Endpoint:' +
      reqUrl.pathname)
    service.testRequest(req, res)
  } else {
    console.log('Request Type:' +
      req.method + ' Invalid Endpoint:' +
      reqUrl.pathname)
  }
  service.invalidRequest(req, res)
})
