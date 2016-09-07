let cheerio = require('cheerio')

import request from './request'

// 存放发起 request 请求时的配置项
let options = {}

// 抛出一个方法，接受参数 url 待抓取的网址，默认为 http://wwww.zhongchou.com/browser
// sort 表示项目的 排序方式，支持的有‘默认’‘最新上线’‘目标金额’‘支持人数’‘筹款额’，不支持正序和逆序的选择。
// num 表示需要抓取的项目的数量。
// TODO: 并没有支持根据大分类或者小分类来进行抓取，后期考虑加入
export default async(num = 0, sort = '默认', url = 'http://www.zhongchou.com/browse', waitTime = 0) => {

    // TODO： 需要判断传入的是否是合法的 url 吗？？？？

    options = {
        uri: '',
        transform: function (body) {
            return cheerio.load(body)
        }
    }
    options.waitTime = parseInt(waitTime, 10)
    num = parseInt(num, 10)

    let sorts = {
        '默认': '/p',
        '最新上线': '/sb-p',
        '目标金额': '/sm-p',
        '支持人数': '/si_c-p',
        '筹款额': '/si_m-p'
    }
    if (Object.keys(sorts).indexOf(sort) === -1) {
        sort = '默认'
    }
    url += sorts[sort]

    if (!Number.isInteger(num) || num < 0) {
        throw new Error('需要抓取的项目 url 的数量只能为正整数,或 0（代表抓取所有）')
    }

    return await gogogo(url, num)
}

// 开始抓取
async function gogogo(url, num) {
    console.log('开始抓取')

    // 存放最终获取到的结果，形式为 { url+date ： url }
    let result = {}

    // 这个网站默认每页显示的项目数量为 24 个
    let perPageNum = 24

    if (num !== 0) {
        // 不抓取所有，这个时候就需要计算一下具体要抓取到第几页的第几个
        let {grabPageNum, lastPageProjectNum} = calc(perPageNum, num)

        for (let i = 0; i < grabPageNum; i++) {
            options.uri = `${url}${i + 1}`
            result = Object.assign({}, result, await request(options))

            console.log('================== start ===================')
            console.log('抓取第' + (i + 1) + '页')
            console.log('已抓取' + Object.keys(result).length + '个 projectUrl')
            console.log('================== end ===================')
        }

        // 如果所有要抓取的数量不能被每页的数量整除，那么最后一页就得单独请求一下了
        if (lastPageProjectNum !== 0) {
            options.uri = `${url}${grabPageNum + 1}`
            result = Object.assign({}, result, await request(options, lastPageProjectNum))

            console.log('================== start ===================')
            console.log('抓取第' + (grabPageNum + 1) + '页')
            console.log('已抓取' + Object.keys(result).length + '个 projectUrl')
            console.log('================== end ===================')
        }
    } else {
        // 抓取所有的 project 啦，来个死循环
        for (let i = 1; i > 0; i++) {

            options.uri = `${url}${i}`
            let newResult = await request(options)
            if (!newResult) {
                break
            }
            result = Object.assign({}, result, newResult)

            console.log('================== start ===================')
            console.log('抓取第' + (i + 1) + '页')
            console.log('已抓取' + Object.keys(result).length + '个 projectUrl')
            console.log('================== end ===================')
        }
    }

    return result
}

function calc(perPageNum, num) {
    if (num <= perPageNum) {
        return {
            grabPageNum: 0,
            lastPageProjectNum: num
        }
    }

    // 最后一页需要抓取的 project 数量
    let lastPageProjectNum = num % perPageNum
    // 除了最后一页，需要抓取的页数
    let grabPageNum = (num - lastPageProjectNum) / perPageNum

    return {
        grabPageNum,
        lastPageProjectNum
    }
}