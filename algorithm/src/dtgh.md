# 动态规划

## 基本套路

### 思考步骤

> 案例 198 打家劫舍

- 回溯

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let n = nums.length
  const dfs = i => {
    if (i === 0) {
      return 0
    }
    return Math.max(dfs(i - 1), dfs[i - 2] + nums[i])
  }
  return dfs(n - 1)
}
```

- 记忆化搜索

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let n = nums.length
  let cache = new Array(n).fill(-1)
  const dfs = i => {
    if (i === 0) {
      return 0
    }
    if (cache[i] !== -1) return cache[i]
    let res = Math.max(dfs(i - 1), dfs(i - 2) + nums[i])
    cache[i] = res
    return res
  }
  return dfs(n - 1)
}
```

- 递推( 前三个直接开始运算)

```js
var rob = function(nums) {
  let n = nums.length
  let f = new Array(n + 2).fill(0)
  for (let i = 0; i < nums.length; i++) {
    f[i + 2] = Math.max(f[i + 1], f[i] + nums[i])
  }
  return f[n + 1]
}
```

- 递推空间优化

```js
var rob = function(nums) {
  let f0 = (f1 = 0)
  for (let i = 0; i < nums.length; i++) {
    let new_f = Math.max(f1, f0 + nums[i])
    f0 = f1
    f1 = new_f
  }
  return f1
}
```

## 注意点

### 一定要注意到, 边界条件的初始值 这个真的很重要
