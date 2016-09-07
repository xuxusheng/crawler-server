# crawler-server
爬虫gogogo，开始整合服务器！

## getUrl 分支

请求 project 的 url

npm run start 启动项目

通过发送 post 请求来激活任务

post 请求包含参数：

```
{
  num: 0, // 请求的 url 的数量，默认为0，表示请求所有的 url
  sort: '', // 请求的 url 的排序，支持的有‘默认’‘最新上线’‘目标金额’‘支持人数’‘筹款额’，没啥大用，只是为了抓取小类的需求留的坑
  url: '', // 默认为 http://www.zhongchou.com/browse ，一般不用改
  waitTime: 0 // 每两次请求之间的间隔，防止 ip 被封，请求 url 时默认为0，没有间隔。
}
```

每个分支表示一个任务还是有点坑啊，还是把所有任务都搞在一个项目里，通过post参数来决定加载不同的任务得了。