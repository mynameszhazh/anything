# 时间切片

## 前提知识

### 并发和并行不是一个概念
- 一句话总结
  - 并发
    -  电脑执行多个进程的使用,用的都是一个cpu
       - 只是这个 `cpu` 的执行速度非常的快, 他在多个进程之间进行`来回的切换`, 速度太快, 然后让你以后他在多个进程同时执行
  - 并行
    - 这个是真正的用到了多个cpu 一样的感觉,是真的不会产生 切换的效果的

### 操作系统小总结

- [参考这个就完事了](./operatingSystem.md)

### 高性能渲染十万条数据

- High performance rendering data
- [时间切片](https://juejin.cn/post/6844903938894872589#heading-1)
- [虚拟列表](https://juejin.cn/post/6844903982742110216)
  

## fiber

### 一种流程控制原语

- 主动让出机制
  - 这种方式类似是 js中的 `generator`,函数执行到`yeild`,会跳出函数,然后只有外部调用了 `next` 之后才能继续执行
  - `fiber` 现在有点这样的问道
    - 之前的react的执行时,只有我只想完成了,才有 浏览器的执行的份额
    - 现在是 全部由浏览器来控制, 浏览器执行完了 一些操作之后 由 `react` 这边申请`时间片`
      - 在这个时间里你可以进行执行react 代码, 但是之后一定要还给 浏览器
- 浏览器在空闲的时候会 回调一下 requestIdleCallback 函数,这样,就可以知道一些东西了
  - 只是在 google 中支持, 所有react 自己实现了一个
    - 对于一些优先级的控制,也不是一两百字可以解决的问题
### 一个执行单元
- workLoop 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘执行单元‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个执行单元，反之则停止执行，保存现场，等下一次有执行权时恢复: