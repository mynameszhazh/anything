function frogPosition(n: number, edges: number[][], t: number, target: number): number {
  let map = new Map()
  for (let i = 0; i < edges.length; i++) {
    map.set(edges[i][1], [edges[i][0]])
  }
  let ret = -1
  while (t-- && ret !== 1) {
    ret = map.get(target)
  }
  if(ret === 1) return t == 0 ? 1 : 0
  return 0
};
