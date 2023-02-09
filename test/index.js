function binarySerch(arr, target) {
  let left = 0
  let right = arr.length
  while (left <= right) {
    mid = (left + right) >> 1
    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
