# 渲染流程：Scene→Primitive→Command→Context→WebGL

## scene
- 所有的渲染场景

## primitive
- 可渲染的基本单元, 代表3d场景中的可是对象

## command
- 描述某个渲染操作的对象, 包括着色器 状态 数据

## context
- 管理webgl上下文
- 缓存操作
- 上下文
- 实现浏览器兼容性

## webgl
- 渲染引擎
- 负责实际的渲染操作1