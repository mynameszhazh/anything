## medium

### get return type

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
