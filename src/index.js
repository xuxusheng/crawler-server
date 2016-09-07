let http = require('http')
let query = require('querystring')

import distributeTask from './lib/distributeTask'

http.createServer(function (req, res) {
    // 如果接收到 post 请求
    if (req.method === 'POST') {
        let postData = ''
        req.on('data', function (chunk) {
            postData += chunk
        })
        req.on('end', async function () {

            // params 为 post 请求传递过来的参数
            let params = query.parse(postData)

            // 根据 参数 来进行任务的分配
            let result = {}
            try {
                result = await distributeTask(params)
                console.log('task over ~')
                res.write(JSON.stringify(result))
                res.end()
            } catch (err) {
                res.write(err.message)
                res.end()
            }
        })
    }
}).listen(3000)