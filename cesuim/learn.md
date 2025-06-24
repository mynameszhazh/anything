## Cesium 二次开发学习大纲

### 阶段一：基础知识巩固（2 周）

#### 1. Cesium 核心概念

- 坐标系统：WGS84、ECEF、ENU 和屏幕坐标系
- 几何类：Point、Polyline、Polygon、Billboard 等
- 实体系统：Entity 与 EntityCollection
- 摄像机控制：Camera 类及其操作方法
- 时间系统：JulianDate、TimeInterval 等

#### 2. Cesium 架构理解

- 核心模块：Core、Scene、DataSources、Widgets
  - [core](./src/core.md)
- 渲染流程：Scene→Primitive→Command→Context→WebGL
  - [render](./src/render.md)
- 图块加载机制：TilingScheme、Provider、RequestScheduler
  - 加载优化缓存, 优先级控制
- 加载策略：延迟加载、LOD、屏幕空间误差

#### 3. 源码结构探索

- 搭建 Cesium 开发环境

```bash
   git clone https://github.com/CesiumGS/cesium.git
   cd cesium
   npm install
   npm run build
   npm run start
```

- 熟悉 Source 目录结构
- 使用 VSCode+断点调试跟踪核心流程

#### 4. 实用工具熟悉

- 调试工具：Cesium Inspector、Viewer 配置参数
- 性能工具：RequestRenderMode、PrimitiveCollection
- 数学工具库：Matrix、Quaternion、Cartesian 系列

### 阶段二：基本二次开发能力（3 周）

#### 1. 自定义 Entity 与 DataSource

- 创建自定义 DataSource 类

```javascript
function MyCustomDataSource() {
  this.\_entityCollection = new Cesium.EntityCollection();
  this.\_changed = new Cesium.Event();
  this.\_error = new Cesium.Event();
  this.\_isLoading = false;
  this.\_loading = new Cesium.Event();
}
// 实现必要的接口方法
MyCustomDataSource.prototype.update = function(time) {};
```

- 扩展 Entity 系统添加自定义属性
- 实现自定义数据加载和解析

#### 2. 材质系统扩展

- 理解 MaterialProperty 体系
- 创建自定义材质

```javascript
  // 注册自定义材质
  Cesium.Material.CustomMaterialType = 'CustomMaterial';
  Cesium.Material.CustomMaterialSource = /_ GLSL 代码 _/;
  Cesium.Material.\_materialCache.addMaterial(Cesium.Material.CustomMaterialType, {
  fabric: {
  type: Cesium.Material.CustomMaterialType,
  uniforms: { /_ 自定义参数 _/ }
  }
  });
```

- 实现动态纹理和材质动画

#### 3. 几何系统扩展

- 使用 GeometryInstance 和 Primitive
- 创建自定义几何体

```javascript
// 自定义几何体
function createCustomGeometry(options) {
  return new Cesium.GeometryInstance({
    geometry: new Cesium.CustomGeometry(options)
    // 其他属性
  })
}
```

- 实现几何计算和处理工具

#### 4. 地形和影像提供者定制

- 理解 TerrainProvider 和 ImageryProvider
- 创建自定义数据提供者
- 处理瓦片请求和缓存机制

#### 5. 交互机制开发

- 使用 ScreenSpaceEventHandler
- 实现拾取和选择功能
- 创建自定义输入处理器

### 阶段三：高级功能开发（4 周）

#### 1. 着色器编程基础

- 学习 GLSL 语言基础
- 理解 Cesium 着色器结构
- 掌握 czm\_前缀的内置函数和变量

#### 2. 自定义着色器

- 修改内置 Appearance
- 创建自定义 Appearance
  function CustomAppearance(options) {
  // 实现自定义外观
  }
  // 继承 Appearance
  CustomAppearance.prototype = new Cesium.Appearance();
- 实现顶点和片段着色器

#### 3. 后期处理效果开发

- 使用 PostProcessStage
  const customStage = new Cesium.PostProcessStage({
  fragmentShader: /_ 自定义片段着色器代码 _/,
  uniforms: {
  // 自定义 uniform 变量
  }
  });
  viewer.scene.postProcessStages.add(customStage);
- 创建多通道后处理效果
- 自定义滤镜和特效

#### 4. 3D Tiles 扩展

- 理解 3D Tiles 规范
- 定制 3D Tiles 样式
- 实现自定义 3D Tiles 处理器

#### 5. 粒子系统开发

- 使用 ParticleSystem
- 创建自定义粒子发射器
- 实现复杂的粒子效果

#### 6. 性能优化技术

- 请求调度优化
- 内存管理策略
- 渲染管线优化
- WebWorker 多线程处理

### 阶段四：集成与工程化（3 周）

#### 7. 模块化开发

- 基于 ES 模块封装 Cesium 功能
- 构建可复用的组件库
- 使用 TypeScript 增强代码健壮性

#### 8. 框架集成

- 与 Vue/React/Angular 集成
- 状态管理和响应式设计
- 组件生命周期与 Cesium 事件同步

#### 9. 与第三方库结合

- Cesium + Three.js 混合渲染
- 与 GIS 分析库集成（如 Turf.js）
- 结合数据可视化库（如 ECharts）

#### 10. 工程化与部署

- 打包与压缩策略
- 资源预加载与缓存
- 跨域资源处理
- 部署最佳实践

### 阶段五：实战项目（4 周）

#### 11. 项目实战

- 从需求到设计
- 架构设计与技术选型
- 组件划分与职责定义

#### 12. 实现典型功能

- 自定义图层管理系统
- 动态数据可视化引擎
- 空间分析工具集
- 交互式编辑工具

#### 13. 测试与优化

- 功能测试与自动化
- 性能监控与分析
- 用户体验优化

#### 14. 文档与维护

- API 文档生成
- 示例代码与用例
- 版本管理策略
- 学习资源推荐

### 官方资源

- Cesium 官方文档
- Cesium Sandcastle 示例
- Cesium GitHub 仓库

### 社区资源

- Cesium 中文网
- Cesium 论坛

#### 书籍

- 《3D Engine Design for Virtual Globes》
- 《WebGL 编程指南》
- 视频课程
- Udemy 上的 Cesium 课程
- B 站相关教程

### 实践提示

- 从 Fork 源码开始：直接修改源码是学习内部机制的最佳方式
- 先模仿后创新：先复现官方示例，理解工作原理后再创新
- 小步迭代：每次只专注于一个小功能的实现，逐步构建复杂系统
- 多写 Demo：为每个学到的技术点创建独立 Demo，便于日后参考
- 参与社区：遇到问题积极在 GitHub 上提问或查阅 issue
- 阅读源码：培养阅读源码的习惯，关注 Cesium 的最新变化
