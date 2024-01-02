## easy

### Pick

> ts 中 Pick (Pick<T, K>) 从 T 中挑选一些 k 中有的东西

## keyof
- typeof
  - 将 js 中的数组转换成类型数组
  - 注意力 函数也是一个对象
- keyof
  - 得到类型对象中的所有 key

### readonly

> 只读

- readonly
  - readonly [k in p]: k
    - 进行类型对象便利的时候可以携带上 `readonly` 关键字

### tupleToObject

> 数组转对象

- [k in p[number]]: k
  - 这里添加一个 [number], 表示便利的是类型数组
- as const
  - 数组转对象的时候,可以直接用数组里面的名称作为 key

### FirstOfArray

- T[0]
  - 但是会返回一个 undfined
- T['length'] 会得到长度
- T extents [] ? never : T[0]
  - 如果 T= [] 返回 never 否则..
- T[0] extents T[number] ? T[0] : never


