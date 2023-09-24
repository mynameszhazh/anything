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
