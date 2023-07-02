declare global {
  interface Array<T> {
    snail(rowsCount: number, colsCount: number): number[][]
  }
}

Array.prototype.snail = function (
  rowsCount: number,
  colsCount: number
): number[][] {
  if (this.length != rowsCount * colsCount) return []
  let ret = new Array(rowsCount).fill(0).map(() => new Array(colsCount).fill(0))

  for (let i = 0; i < rowsCount; i++) {
    for (let k = 0; k < colsCount; k++) {
      if (k % 2 == 0) {
        ret[i][k] = this[k * rowsCount + i]
      } else {
        ret[i][k] = this[(k + 1) * rowsCount - i -1]
      }
    }
  }

  return ret
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
