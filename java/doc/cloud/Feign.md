# Feign

> 优雅的进行远程调用

## 声明

- feign

```java
// 声明
@FeignClient(value = "userservice")
public interface UserClient {

    @GetMapping("/user/{id}")
    User findById(@PathVariable("id") Long id);
}
// 使用
```

- restTemplate

```java
 // 根据id查询订单并返回
  Order order = orderService.queryOrderById(orderId);
  String url = "http://userservice/user/" + order.getUserId();
  User user = restTemplate.getForObject(url, User.class);
```

## 自定义 feign 配置

```yml
feign:
  client:
    config:
      default:
        loggerLevel: FULL
```

## 性能优化
- 配置链接池子等


## 最佳实践

- 继承
  - 将一些公用的方法 进行方法抽象
- 抽取
  - 重新再搞一个模块进行feign-api进行抽取