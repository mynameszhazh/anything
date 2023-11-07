# 分布式缓存

> redis 集群

## 基本知识

### 单点 redis 的问题

- redis 数据丢失的问题
  - RDB
    > 内部自动异步保存
  - AOF
    > 只记录操作的步骤
- 并发的问题

  - 主从集群(启动服务的时候手动指定)

  ```js
   // a, b 两个Redis服务, 如何让B作为A的Slave节点
   在b节点执行命令: slaveof a的ip a的端口
  ```

- 故障恢复的问题
  - 哨兵
    - 也是通过 sentinel 进行操作
    - 一样的三种操作
- 存储的问题
  - 分片集群
    - 每个集群中的 master 保存不一样的数据
    - 插槽
      - 所有数据保存在不同的插槽之中去

## 多级缓存

> 亿级请求

- nginx 方向代理
- redis 缓存
- 本地缓存(进程缓存)
  - caffeine(可以直接到 github 查询这个库)

### openResty

> 基于 nginx 内部可以使用 lua 文件语法

- read-data
  - nginx 本地缓存
  - `ngx.shared.item_cache`
- read-redis
  - 配置中调用 redis
- read_http

## 缓存同步

### 数据同步策略

- 设置有效期
- 同步双写
  - 修改数据库的同时, 直接修改缓存
- 异步通知
  - 数据库修改时,发起一个通知

### 安装 Canal

- 开启 mysql 主从

### 监听 Canal

- spring boot 一个库直接解决的明明白白
