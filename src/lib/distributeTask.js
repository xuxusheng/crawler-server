/*
* 分配任务
* */

import getProjectUrl from '../getProjectUrl'

export default async (params) => {

    switch (params.task) {
        case 'getProjectUrl':
            return await getProjectUrl(params.num, params.sort, params.url, params.waitTime)
        default:
            throw new Error('请分配正确的任务')
    }
}