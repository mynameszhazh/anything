function findLCM(arr) {
  // 辅助函数：计算两个数的最大公约数
  function findGCD(a, b) {
    if (b === 0) {
      return a
    }
    return findGCD(b, a % b)
  }

  // 辅助函数：计算两个数的最小公倍数
  function findLCMOfTwoNumbers(a, b) {
    return (a * b) / findGCD(a, b)
  }

  // 计算数组中所有数的最小公倍数
  let lcm = arr[0]
  for (let i = 1; i < arr.length; i++) {
    lcm = findLCMOfTwoNumbers(lcm, arr[i])
  }
  return lcm
}

const numbers = [1, 3, 5, 2, 2]
const lcm = findLCM(numbers)
