# elasticsearch

> 分布式搜索

- 倒排搜索
  > 根据 百度 类似搜索的功能

## 安装

- es
- kibana
- 中文分词器

## 基本用法

- 本地中 `elastic` 开一个服务
- 将我的数据按照类似的手法录入到 elastic 服务中去
- 最后通过 DSL 查询我的数据就完事了

## 高级用法

### 数据聚合

> aggs

- 聚合语法三要素
- 存在聚合的嵌套

### 搜索建议

- 根据拼音进行 不同答案的搜索

## 数据同步

> elastic 和 mysql 之前的数据同步

### 同步调用

### 异步通知

- 更改 mysql 之后调用 mq 的代码触发 elastic 的数据库改变

### 监听 binlog

- 通过 某种东西监听 数据的变化, 从而更新 内容

## es 集群

> 解决存储能力上线

### 单点故障的问题

- 选主的功能
- 故障转移

### 协调节点
