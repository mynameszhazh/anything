# 完全背包

> 可以重复选用

## 基本代码(322 作为重要案例)

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let n = coins.length

  const dfs = (i, s) => {
    if (i < 0) {
      if (s === 0) {
        return 0
      }
      return Infinity
    }
    if (s < coins[i]) return dfs(i - 1, s)
    // 关键点  i 不需要 -1
    return Math.min(dfs(i - 1, s), dfs(i, s - coins[i]) + 1)
  }

  let ans = dfs(n - 1, amount)
  return ans < Infinity ? ans : -1
}
```

### 常见变形

- 和 01 背包类似
