## easy

### Pick (4)

> ts 中 Pick (Pick<T, K>) 从 T 中挑选一些 k 中有的东西

## keyof

- typeof
  - 将 js 中的数组转换成类型数组
  - 注意力 函数也是一个对象
- keyof
  - 得到类型对象中的所有 key

### readonly(7)

> 只读

- readonly
  - readonly [k in p]: k
    - 进行类型对象便利的时候可以携带上 `readonly` 关键字

### tupleToObject(11)

> 数组转对象

- [k in p[number]]: k
  - 这里添加一个 [number], 表示便利的是类型数组
- as const
  - 数组转对象的时候,可以直接用数组里面的名称作为 key

### FirstOfArray(14)

- T[0]
  - 但是会返回一个 undfined
- T['length'] 会得到长度
- T extents [] ? never : T[0]
  - 如果 T= [] 返回 never 否则..
- T[0] extents T[number] ? T[0] : never

### Length of Tuple(18)

- T["length"]
  - 注意这个里面是只读命令

### Exclude(43)

- extends
  - `1 | 2 extends 1 ? never | T // 1`
  - 可以通过限制返回数据

### Awaited(189)

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never
```

- PromiseLike 处理 promise 的时候可以使用
- 可以进行递归

### if(268)

- too easy

### concat(533)

```ts
type Tuple = readonly unknown[]

type Concat<T extends Tuple, U extends Tuple> = [...T, ...U]
```

- 也可以用 [...T, ...U] 来实现

### Includes

- T[number] 表示内部元素的 集合吗?j

### Push(3057) unshift(3060)

- [...T, U]

### Parameters(3312)

- infer
- extends
