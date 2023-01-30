export class ZeroRTCMap {
  constructor() {
    this._entrys = new Array()
  }

  // 插入
  put(key, value) {
    if (key === null || key === undefined) return
    const index = this._getIndex(key)
    if (index == -1) {
      const entry = new Object()
      entry.key = key
      entry.value = value
      this._entrys[this._entrys.length] = entry
    } else {
      this._entrys[index].value = value
    }
  }

  // 根据key获取value
  get(key) {
    const index = this._getIndex(key)
    return index != -1 ? this._entrys[index].value : null
  }

  // 移除key-value
  remove(key) {
    const index = this._getIndex(key)
    if (index != -1) {
      this._entrys.splice(index, 1)
    }
  }

  // 清空map
  clear() {
    this._entrys.length = 0
  }

  // 判断是否包含key
  contains(key) {
    const index = this._getIndex(key)
    return index != -1 ? true : false
  }

  size() {
    return this._entrys.length
  }

  _getIndex() {
    if (key == null || key == undefined) return -1
    const _length = this._entrys.length
    for (let i = 0; i < _length; i++) {
      const entry = this._entrys[i]
      if (entry == null || entry === undefined) continue
      if (entry.key === key) return i
    }
    return -1
  }
}

export class Client {
  constructor(uid, conn, roomId) {
    this.uid = uid
    this.conn = conn
    this.roomId = roomId
  }
}
