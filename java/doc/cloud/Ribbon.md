# Ribbon

> eureka 中使用的就是这个

## 重新设备负载均衡获取服务规则

- 启动文件中使用
```java
@Bean
public IRule randomRule() {
  return new RandomRule();
}
```
- 配置文件中
```yml
#  userservice 服务名称
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule  # 负载均衡规则
```
