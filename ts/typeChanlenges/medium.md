## medium

### get return type(2)

- infer
  - 假设一个值
  - 可以用于返回值
  - 不在乎作用域
- extends
  - 限制
  - 判断
- Fcuntions
  - 注意大写开头表示只能是函数

```ts
// MyReturnType 返回 类型函数 T 的返回值 类型
type MyReturnType<T extends Function> = T extends (...args: any) => infer R
  ? R
  : never
```

### Omit

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

### Readonly 2

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>
```

- = 赋值默认值
- &
- Omit 在 T 去除有 k 的所有部分
- Pick 选出

### Deep Readonly

```ts
type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> }
```

- `keyof T extends never`
- 判断是不是空对象
