'use strict'
let http = require('http')
let url = require('url')
let query = require('querystring')

import getProjectUrl from './getProjectUrl'

export default startServer

// 开启服务器进程
async function startServer() {
    http.createServer(function (req, res) {
        // 如果接收到 post 请求
        if (req.method === 'POST') {
            let postData = ''
            req.on('data', function (chunk) {
                postData += chunk
            })
            req.on('end', async function() {

                // params 为 post 请求传递过来的参数
                let params = query.parse(postData)

                let result = {}
                try {
                    result = await getProjectUrl(params.num, params.sort, params.url, params.waitTime)
                } catch(err) {
                    res.write(err.message)
                    res.end()
                }

                res.write(JSON.stringify(result))
                res.end()
            })
        }
    }).listen(3000)
}

