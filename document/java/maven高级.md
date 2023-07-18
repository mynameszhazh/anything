# maven 高级

> 大型项目中的 maven 应用

## 分模块设计

- 就是将 一个打包 com.itheima 中的 prop 或者 utils 完全抽取到另外一个项目中去
  - 但是只要加入了 maven pom 配置引入,就没有任何的问题
    - 注意包的名称 要对应起来 `一模一样`就好了

## 继承和聚合

### 继承

#### 继承关系

< 如果所有的模块都引用了同一个依赖?

- 使用父工程技术

```xml
    <!-- 类似使用方式 -->
    <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.7.5</version>
      <relativePath/> <!-- lookup parent from repository -->
  </parent>
```

- 也需要创建模块 parent, 需要设置 打包方式 pom(默认 jar)

```xml
<packaging>pom</packaging>
```

- 和 java 类似的继承管理

  - 单继承, 但是层级可以很深

- 需要写一个 `relativePath`

#### 版本锁定

> 如何统一管理各个模块的依赖版本

- 父工程 pom 文件中通过 `dependencyManagement` 来进行操作

  - 如果父工程中依赖加了这个, 子工程就不需要在写`version`了
  - 加了这个属性的值, 子工程中不会直接加载依赖, 需要子工程单独引入

- 自定义属性
  - 父工程中
    - 定义
      ```xml
          <properties >
              <lombok.version>1.18.25</lombok.version>
          </properties>
      ```
    - 使用
      ```xml
      <version>${lombok.version}</version>
      ```

### 聚合

> 将我各个模块的包联系起来

- 父工程中 pom 通过 `modules`

```xml
<modules>
  <module>../**</module>
  <module>../**</module>
</modules>
```

## 打包私服

> 不同团队直接的代码共享(局域网)
