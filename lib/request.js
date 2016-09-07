let rp = require('request-promise')

import wait from './wait'

// 开始请求具体的页面

export default request

// options 为请求的配置项
// num 为当前页面中具体捕获几个 project 的 url，默认为所有
async function request(options, num = '') {

    if (options.waitTime !== 0) {
        await wait(options.waitTime)
    }

    let currentTime = Date.now()
    let $ = await rp(options)
    let url = null
    let key = null
    let $siteCardItemImgA = $('.siteCardItemImgA')
    let result = {}

    if ($siteCardItemImgA.length === 0) {
        // 这一页未抓取到任何数据，说明已经抓过了最后一页（这个网站比较坑爹，就算抓取到的页码数已经不存在了，依然正常的返回，只是没有数据），并不会跳转到 404 页面去
        return null
    }

    $siteCardItemImgA.each((index, item) => {
        if (!!num && num === index) {
            return false
        }
        url = $(item).attr('href')
        key = url + '_' + currentTime
        result[key] = url
    })

    return result
}