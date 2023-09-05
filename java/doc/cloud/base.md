## 认识

### 分布式架构

> 耦合低 互不影响

- 缺点
  - 组织起来比较麻烦
- 特征
  - 单一职责
    - 每一个服务都对应唯一的业务能力
  - 面向服务
    - 微服务对外部暴露接口
  - 自治
    - 团队独立, 技术独立, 数据独立, 部署独立

### 微服务结构

- 服务集群
- 服务检测保护
  - \*\*
- 服务网关
  - geign(http 协议)
- 配置中心
  - springCLoudConfig
- 注册中心
  - consul. eureka

### 企业需求

> 会有四种方式,进行项目构造

- springCloud + feign
- springcloudalibaba + geign
- springcloudalibaba + doble
- double


### 服务拆分及远程调用
- 不同服务服务器,不要重复开发相同业务
- 微服务数据独立, 不要访问其它微服务的数据库
- 暴露接口