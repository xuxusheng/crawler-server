# crawler-server
爬虫gogogo，开始整合服务器！

## integrate-task 分支

一个任务一个分支的方式有点坑，还是将所有任务都放在一个项目里好了

启动一个服务进程后，通过 post 参数来决定究竟调用哪一个任务。

这样就不用代码丢到远端还要自己去切分支了，不管丢到哪里都是只要跑起来服务器进程就行了。

### 启动：
```
npm run start
```

### 参数：

> 注意请求方式为 POST

```
{
  task: 'getProjectUrl',
  num: 66,
  waitTime: 3000,
  task: 'getProjectUrl'
}
```