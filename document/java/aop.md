# AOP

## 事务管理

### spring 中使用

> @Transactional(rollbackFor = Exception.class)

- rollbackFor
  - 指定事务回滚的拦截类型
- propagation
  - 指定事务的传播方式
  - 主要针对那些 事务`嵌套`的操作进行处理

## 详细分析

### 基础知识

- 引入依赖

```yml
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

- aop 程序编写

```java
package com.itheima.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class TimeAspect {
    @Around("execution(* com.itheima.service.*.*(..))")// 执行范围
    public Object recordTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long begin = System.currentTimeMillis();

        // 执行原始方法
        Object result = joinPoint.proceed();

        long end = System.currentTimeMillis();
        log.info(joinPoint.getSignature() + "方法执行耗时: {}ms", end - begin);
        return result;
    }
}
```

- `@Around` 这样执行范围内的所有方法都会去调用这个方法了
  - 前面那个事务的操作 底层也是用这个东西进行解决问题的

### 核心概念

> 内部会将我增加的方法生成一个动态代理然后进行处理

- 连接点(joinPoint)
- 切入点(PointCut)
- 通知(Advice)
- 切面(Aspect)
- 目标对象(Target)

### 通知类型

- `@Around`
  - 环绕通知
- `@Before`
- `@After`

- `@AfterReturning`
  - 返回通知, 如果存在异常不会通知
- `@AfterThrowing`
  - 异常了才会通知

### 通知顺序

- 还是很`洋葱模型` 挺像的
  - 只不过这是 before 和 after, 进行默认处理
  - `@Order` 这样是可以控制顺序的
- 更加方便

### 切入点表达式 execution

- 通过特定的通配表达式语法进行 匹配处理的方法是哪些

### 切入点表达式 annotation

- 可以通过`自定义`的注解进行操作
  - @annotation(com.itheima.anno.Log)
  - Log 就是我自定义注解的名称
- 更加灵活

### 连接点

```java
    @Around("se()")// 执行范围
    public Object recordTime(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getTarget().getClass().getName(); // 获取目标类名称
        Signature signature = joinPoint.getSignature(); // 获取目标方法签名
        String methodName = joinPoint.getSignature().getName(); // 获取目标方法名
        Object[] args = joinPoint.getArgs(); // 获取目标方法运行参数
        Object result = joinPoint.proceed(); // 执行原始方法, 注意这里可以将 args 传递进去
        return result;
    }
```

- 通过上面这些常用的方法 可以对我们的函数进行更多对应的操作处理

### 记录操作日志

- 建表

```sql
-- 操作日志表
create table operate_log(
    id int unsigned primary key auto_increment comment 'ID',
    operate_user int unsigned comment '操作人ID',
    operate_time datetime comment '操作时间',
    class_name varchar(100) comment '操作的类名',
    method_name varchar(100) comment '操作的方法名',
    method_params varchar(1000) comment '方法参数',
    return_value varchar(2000) comment '返回值',
    cost_time bigint comment '方法执行耗时, 单位:ms'
) comment '操作日志表';
```

- 通过 annotation 的方式尽心处理
  - 自定义注解(@Log)
    - 这个注解到时加载 `controle` 层
  - 创建切面类(@Aspect)
