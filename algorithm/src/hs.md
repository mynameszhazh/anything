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

## 组合型回溯

> 可以看成长度`固定`的子集型回溯

### 剪枝技巧

- 剩余不足

```js
设path长为 `m`
那么还需要选 `d=k-m` 个数
设当前需要从 `[1,i]` 这i个数中选数
如果 `i<d`
最后必然无法选出 `k` 个数

```

### 案列

- 77 组合
- 216 组合总和 III
- 22 括号生成

## 排列型回溯

### 案列

- 46 全排列
- 51 N 皇后
  - 瞬间看不懂了..

## 思考

### 回溯各个类型之间的区别
