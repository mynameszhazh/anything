# interview

## 基本

### 微服务的常用组件是什么?

- 基本
  - 注册中心: erureka nacos
  - 网关: gateWay zuul
  - 远程调用: feign
  - 负载均衡: ribbon
  - 服务保护组件: sentinel
  - 服务配置管理: nacos
  - 缓存组件: redis
  - 各种环境管理 Docker
- 其它
  - 登录权限认证控制组件: shiro
  - 文件上传操作组件: poi
  - 模板生成组件: freeMarker
  - 智能 ai: 百度 ai
  - 工作流控制: activiti
  - 存储服务: 七牛云存储
  - pdf 操作: jasperReport
  - 大数据快速检索: elasticsearch
  - 分布式事务: seata
  - 分布式缓存: openResty -> Canal
  - 异步数据处理: MQ

## 源码

### nacos 服务注册表结构是怎么样的?

- nacos 采用的是一种分级存储的模式,
  - namespace -> 分组 -> 服务 -> 集群 -> 实例
- java 代码中是

```java
//  namespace 所有的服务
Map<String Map<String, Service>>

// Service 内部集群结构
Map<String, Cluster>

// Cluster 内部实例结构
Set<Instance>
```

### Nacos 如何支撑数十万服务注册压力?

> Nacos 内部接收到注册的请求时, 不会立即写数据, 而是将服务注册的任务放入一个阻塞队列就立即响应给客户端. 然后利用线程池读取读取阻塞队列中的人物, 异步来完成实例更新, 从而提高并发写能力.

### Nacos 如何避免并发读写冲突问题

> nacos 内部在更新实例的时候, 会先拷贝一份旧实例的, 更新完成之后, 直接覆盖旧的实例

- 因为实例的时候 中间存在一些同步操作, 会比较卡顿

### nacos 和 eureka 的区别有哪些

- 接口方式: 都用 rest 的方式暴露接口
- 实例类型: nacos 有 永久和临时两种类型, eureka 只有一种
- 健康检测: nacos 对临时类型采用 心跳模式, 永久实例采用 主动请求的方式来检测
- 服务发现: nacos 支持定时拉取和订阅推送 两种模式; eureka 只支持定时拉取模式
  - 定时拉取
    - 每固定一个时间段,进行服务拉取
  - 订阅推送
    - 有服务更改,立即进行更改
    - 在某一个服务中会进行缓存, 这样就可以实时知道服务的状态了

### sentinel 的线程隔离与 Hystix 的线程隔离有什么区别

- hystix 使用线程隔离
  - 会带来额外的开销,性能一般,隔离性强
  - 支持异步, 和主动断开
- sentinel 基于 信号量(计数器) 实现的线程隔离
  - 性能较好, 隔离性一般

### Sentinel 的限流与 Gateway 的限流有什么差别?

- Sentinel
  - 固定窗口计数器算法
  - 滑动窗口计数器算法
    - 超出丢弃
  - 令牌桶算法
  - 漏桶算法
    - 慢慢放行
    - 满了丢弃
  - 不同模式 使用了不同算法
- Gateway
  - 基于 redis 的令牌桶算法

### Sentinel 源码分析

- processorSlotChain
  - 一步一步往后处理, 开始进行结构创建 -> 数据统计 -> 到规则判断
- Entry
  - 入口资源的处理方式
- Context
  - 调用链的上下文
- 执行链路
  - 各个链路的操作处理
