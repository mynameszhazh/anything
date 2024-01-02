## typeChanlenges

> 这里只会说明我自己遇到的问题点

### Pick

> ts 中 Pick (Pick<T, K>) 从 T 中挑选一些 k 中有的东西

- ## keyof
- typeof
  - 将 js 中的数组转换成类型数组
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
