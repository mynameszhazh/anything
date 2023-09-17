# eureka

> 内置负载均衡

## 远程调用问题

- 直接通过 RestTemplate.getObject 调用 相当于代码写死 j

## eureka 原理

- 做中转

## 搭建 Eurekaserver

- 引入 eureka-server 依赖
- 添加 @enableEurekaServer 注解
- 在 application.yml 中配置 eureka 地址

## 服务注册

- 每个服务需要单独的注册
  - user-server
  - order-server
- 注册步骤

  - 引入依赖

  ```xml
   <!--eureka客户端依赖-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
  ```

  - 写配置

  ```yml
  spring:
    application:
      name: userservice
  eureka:
    client:
      service-url: # eureka的地址信息
        defaultZone: http://127.0.0.1:10086/eurek
  ```

## 服务发现

- 之前通过 ip 地址调用的地址 => 变为 userService 这样的 ip 进行调用
