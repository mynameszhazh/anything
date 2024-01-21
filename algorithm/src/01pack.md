# 01 背包

> 有一个固定容量的背包`capacity`, 现在有一些物品, w 大小 , v 价值, 求价值最高, 的装配方案

## 基本代码(494 作为重要案例)

```js
function zero_one_packe(capacity, w, v) {
  n = w.length

  const dfs = (i, c) => {
    if (i < 0) {
      return 0
    }
    if (c < w[i]) {
      return dfs(i - 1, c)
    }

    return Math.max(dfs(i - 1, c), dfs(i - 1, c - w[i]) + v[i])
  }
  return dfs(n - 1, capacity)
}
```

### 常见变形

- 至多装 capacity, 求方案数/`最大价值和`

```js
// 这就是第一种
```

- 恰好装 capacity, 求`方案数`/`最大/最小/价值和`

```js
// 求的是方案数量
const dfs = (i, c) => {
  if (i < 0) {
    if (c == 0) return 1
    return 0
  }
  if (c < nums[i]) return dfs(i - 1, c)
  return dfs(i - 1, c) + dfs(i - 1, c - nums[i])
}
```

- 递推

```js
var findTargetSumWays = function(nums, target) {
  target += nums.reduce((a, b) => a + b, 0)
  if (target < 0 || target % 2 != 0) return 0
  target /= 2

  let n = nums.length

  let f = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0))
  f[0][0] = 1

  for (let [i, x] of Object.entries(nums)) {
    for (let c = 0; c <= target; c++) {
      if (c < x) {
        f[i + 1][c] = f[i][c]
      } else {
        f[i + 1][c] = f[i][c] + f[i][c - x]
      }
    }
  }

  return f[n][target]
}
```

- 空间优化

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  target += nums.reduce((a, b) => a + b, 0)
  if (target < 0 || target % 2 != 0) return 0
  target /= 2

  let n = nums.length

  let f = new Array(2).fill(0).map(() => new Array(target + 1).fill(0))
  f[0][0] = 1

  for (let [i, x] of Object.entries(nums)) {
    i = parseInt(i)
    for (let c = 0; c <= target; c++) {
      if (c < x) {
        f[(i + 1) % 2][c] = f[i % 2][c]
      } else {
        f[(i + 1) % 2][c] = f[i % 2][c] + f[i % 2][c - x]
      }
    }
  }

  return f[n % 2][target]
}
```

- 只用一个 一维 数组

```js
var findTargetSumWays = function(nums, target) {
  if (target < 0 || target % 2 != 0) return 0
  target /= 2

  let f = new Array(target + 1).fill(0)
  f[0] = 1

  for (let x of nums) {
    for (let c = target; c > 0; c--) {
      f[c] = f[c] + f[c - x]
    }
  }

  return f[target]
}
```

- 恰少装 capacity, 求方案数/`最小价值和`

```js
```

## 理解
