export default async (time) => {
    return new Promise((resolve, reject) => {
        console.log('耐心等待' + time / 1000 + '秒哈~')
        setTimeout(() => {
            resolve('等了' + time / 1000 + '秒了')
        }, time)
    })
}