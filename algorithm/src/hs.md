# 回溯

## 基本套路

- 递归
- 回溯三问?(各个题目思路各不一样)
  - 当前操作?
  - 子问题?
  - 下一个子问题?

## 子集型回溯

### 站在 `输入` 的角度思考

> 每个数 可以再自己中(选) 也可以不在自己中(不选) `叶子就是答案`

- 代码模板

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const ans = []
  const path = []
  const len = nums.length
  const dfs = i => {
    if (i === len) {
      ans.push(path.slice())
      return
    }

    dfs(i + 1)

    path.push(nums[i])
    dfs(i + 1)
    path.pop()
  }
  dfs(0)
  return ans
}
```

### 站在`答案`的角度思考

> 枚举第一个数选谁 枚举第二个数选谁 ..... `每个节点都是答案`

- 回溯三问

  - 当前操作? 枚举一个下标 j>=i 的数字, 加入 path
  - 子问题? 从下标 >= i 的数字中构造子集
  - 下一个子问题? 从下标 > i + 1 的数字中构造子集

- 代码模板

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const ans = []
  const path = []
  const len = nums.length
  const dfs = i => {
    ans.push(path.slice())
    if (i === len) {
      return
    }

    for (let j = i; j < len; j++) {
      path.push(nums[j])
      dfs(j + 1)
      path.pop()
    }
  }
  dfs(0)
  return ans
}
```

### 案例

- 17 电话号码的字母组合
- 78 子集(上面的模板所用题目)
- 131 分割回文串
