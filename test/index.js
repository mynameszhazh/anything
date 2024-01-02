export var countWords = function(words1, words2) {
  let count = 0
  if (words1.length === 0 || words2.length === 0) return count
  let map1 = new Map()
  let map2 = new Map()
  for (const item in words1) {
    map1.set(
      words1[item],
      map1.has(words1[item]) ? map1.get(words1[item]) + 1 : 1
    )
  }
  for (const item in words2) {
    map2.set(
      words2[item],
      map2.has(words2[item]) ? map2.get(words2[item]) + 1 : 1
    )
  }

  for (const [key, value] of map1) {
    if (value === 1) {
      if (map2.has(key)) {
        if (map2.get(key) === 1) {
          count++
        }
      }
    }
  }

  return count
}
