/**
 * @author BillowsTao
 * @description 导入依赖的文件controller.js，提供监听服务在'localhost:3000'
 */
const hostname = '127.0.0.1'
const port = 3000
const server = require('./controller.js')
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
