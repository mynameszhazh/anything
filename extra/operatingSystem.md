
## 先到先得(fcfs)
  - 最简单的调度方式,存在几个缺点
    - 对于 短进程 不利
      - 因为 `fcfs` 是一种同步的策略,就相当于是排队一样
        - 就比如在食堂打饭一样,你是只要打一份饭, 而你前面的需要打好几份,这样对你来说是不公平的
          - 因为你打饭需要的时间肯定会更少,但是你要等你前面的人搞定了,才能到你
    - 对于 io 密集型 不利
      - 这种,操作就类似于,你做这个事情,是需要前面的流程全部 妥善了之后才能执行的操作
        - 每一个 流程中的操作都是需要排队进行的,当你进行到后面的步骤的时候,发现前面的操作,还没有完成你就又要到前面进行排队,做完之后,在重新到这里进行排队
  - 总结
    - 不合理

## 轮转

- 这个方式,也好理解,就是对于我 n 的进程, 我每一个进程执行一定的时间之后,切换为另外的进程执行
  - 不过这样也是存在问题
    - 因为切换也是需要代价的, 这样肯定是增加了负担
    - 而且不能我每一个进程需要的`执行时间`是多少比较合适
      - 太多,可能会`进度缓慢`
      - 太少,性能`消耗太大`
    - 关于 `fcfs` 的 `io 密集型处理` 也还是没有得到解决


## 短进程优先执行(SPN)

- 这种方式,也是存在问题
  - 如果存在大量的 短进程,那么长进程就会 出现饿死的情况
  - 还要通过一些程序计算程序的执行优先级
    - 这个也是需要成本
  - 这种问题, 如果当一个长进程执行的时候,整个进程还是会出现 严重阻塞的问题

## 最短剩余时间(srt)

- 这种方式的主要执行思路是,我`新进来`的一个进程的执行时间少于`正在执行`的进程的时间,新进来的就会抢占cpu的执行资源
- 问题
  - 长进程饿死的情况还是没有解决
  - 需要纪录历史的执行时间

##  最高响应比优先(HRRN)
- 主要公式
> 响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间
- 很好理解的一种方式
  - 短进程 肯定会优先执行
  - 长进程,不会优先执行,但是根据时间的进行他的执行优先级也会慢慢上来


## 反馈法
- 前提
  - 准备多个队列, (例如 队列1 队列2), 队列1的执行优先级高于队列2
- 这种方式就需要 用到上面的 `轮转` 的方式,进行一个配合
  - 不过这里经过一侧轮转之后,这个任务的执行就会放到 后面的队列2,
  - 只有当所有的 队列1的任务执行完毕之后 才有队列2的执行
    - 同理 还是需要通过 `轮转` 进行执行
- 当然如果 长进程的执行时间过长,他会一直被提高一个优先级执行这样


## 总结

- 这样是远远 不够的对于 内存调度的方法来说
- [linux 系统](https://blog.csdn.net/gatieme/article/details/51456569)