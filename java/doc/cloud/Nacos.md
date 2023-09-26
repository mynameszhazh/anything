# Nacos

> Nacos

## 安装环境

- 主包引入

```xml
<!--nacos的管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.5.RELEASE</version>
    <type>pom</type> <scope>import</scope>
</dependency>
```

- 子包引入

```xml
 <!-- nacos客户端依赖包 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!--nacos的配置管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

- 配置文件

```yml
spring:
  cloud:
    nacos:
      server-addr: nacos:8848 # nacos地址
      #  config:
      #    file-extension: yaml # 文件后缀名
```

## 坑

### maven 依赖安装

> 一定判断是否安装成功

### 旧版本的代码要怎么拉取包呢

- maven setting.xml 文件版本处理
- 是否是因为电脑处理呢

#### 解决方案

- 一开始就用新版本
- 如果只是维护就不存在这样的问题

- 感悟
  - 不要在一个地方太久了
  - 不顺就是会所有的事情都变得不那么顺利

## nacos 集群

- 通过集群规则可以进行 一些访问操作
  - 里面很多权重操作
    - 同集群优先
    - 设置权重值
  - 在 nacos 服务直接进行操作
    - 全国各地的人都是可以访问这个服务

## 环境隔离 namespace

- 每个 nacos 服务实例会有一个 namespace 和 group 的概念
  - 需要再代码的配置文件中进行配置
  - 注意填写的是 id 不是 名称
- 不同 namespace 之前的服务是互补想通的

## 临时实例和非临时实例

- 临时实例 会自动发送心跳
- 非临时实例, 服务端进行心跳触发 -> 如果服务关闭了, 会发送通知

## 和 eureka 的 区别

- 多了非临时实例
- 服务实例更改 会进行通知

## 配置管理

### 统一配置管理

- 配置更改热更新
