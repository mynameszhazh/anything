# 微服务保护

## sentinel

### 雪崩问题及解决方案

- 1.超时处理
  - 每个连接时间超时之后,自动关闭
  - 但是每个连接都会占用 tomat 的资源
- 2.舱壁模式
  - 每个服务同时占用服务器的资源 分别展开限制
- 3.熔断降级
  - 检测到某个连接是一个失败的服务时 之后出现的连接都会拒绝连接
- 4.流量控制
  - 从根本上杜绝错误的出现

### 服务保护技术对比

- Sentinel 就完事了

### 介绍和安装

- github 下载一个 jar 包 运行之后就有了 服务

### 微服务整合 Sentinel

## 流量控制

> 控制每个接口调用的次数 在 sentinel 的服务中声明

### 流控方式

- 1.直接控制
  - 限制指定的接口
- 2.关联控制(优先级)

  - 当有些操作很多的时候, 限制其它会关联到的接口
  - 如: 执行更改过多时,限制查询接口的调用

- 3. 链路(来源判断)

### 流控效果

- 直接失败
- warm up 预热模式
  - 解决服务冷启动导致报错的问题
- 排队等待
  - 解决那种 偶尔一下流量非常大的场景
- 热点参数限流
  - 根据接口内部传递参数来进行分组限流
  - 注意 里面的参数是`写死`的

## 隔离和降级

### 隔离

- 线程池隔离
- 信号量隔离

### 降级

## 授权规则

- 调用方来源控制
  - 请求信息添加 请求头信息
- 自定义异常处理
  - 一样的配置操作

## 规则持久化
- 原始模式
  - 保存在内存
- pull 模式
  - 保存在本地文件中
- push 模式
  - 数据联系到nacos中,进行统一处理
