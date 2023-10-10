# Gateway

## 为什么需要网关

- 进行身份认证
- 服务路由
- 负载均衡
- 请求限流

## gateway 快速入门

- 技术实现
  - gateway
    - 有较好的性能, 一般会使用这个
  - zuul
    - 阻塞式编程
- 配置
  - id
  - uri
  - predicates(路由断言)
  - 路由过滤器(filters)

## 断言工厂

- 上面配置中 predicates 的配置方式 (共 11 种)
- 示例

```yml
gateway
  routes:
    predicates:
      - Path=/order/**
      - Before=2031-04-13
```

## 过滤器工厂

> 对请求和响应进行过滤

## 全局过滤器

- 配置

```yml
gateway
  routes:
    # filters:
    #   - AddRequestHeader=Trth, Itcast is freaking awesome!
  default-filters:
    - AddRequestHeader=Trth, Itcast is freaking awesome!
```

- 全局过滤器
  - 自定义过滤规则
  - 定义过程
    - 通过自定义类, 注册到 springBoot 中去
    ```java
      @Order(1)
      @Componetnt
      public class AuthFileter implements GlobalFileter{
        if(ture) {
          return chain.filter(exchange);
        }
        return exchange.getResonponse().setComplets()
      }
    ```
- filter 排序规则
  - filters > default-filters > globalFilter

## 跨域问题

- 配置操作
  - 具体查看官方文档比较靠谱
