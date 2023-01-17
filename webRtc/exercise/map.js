var zeroRTCMap = function() {
  this._entrys = new Array()
  // 插入
  this.put = function(key, value) {
    if (key === null || key == undefined) return
    const index = this._getIndex(key)
    if (index === -1) {
      const entry = new Object()
      entry.key = key
      entry.value = value
      this._entrys[this._entrys.length] = entry
    } else {
      this._entrys[index].value = value
    }
  }
  // 根据key获取value
  this.get = function(key) {
    var index = this._getIndex(key)
    return index !== -1 ? this._entrys[index].value : null
  }
  // 移除key-value
  this.remove = function(key) {
    var index = this._getIndex(key)
    if (index != -1) {
      this._entrys.splice(index, 1)
    }
  }
  // 清空map
  this.clear = function() {
    this._entrys.length = 0
  }
  // 判断是否包含key
  this.contains = function(key) {
    var index = this._getIndex(key)
    return index != -1 ? true : false
  }
  this.size = function() {
    return this._entrys.length
  }
  this.getEntrys = function() {
    return this._entrys
  }
  this._getIndex = function(key) {
    if (key === null || key === undefined) {
      return -1
    }
    var _length = this._entrys.length
    for (let i = 0; i < _length; i++) {
      var entry = this._entrys[i]
      if (entry == null || entry == undefined) {
        continue
      }
      if (entry.key === key) {
        return i
      }
    }
    return -1
  }
}

function Client(uid, conn, roomId) {
  this.uid = uid
  this.conn = conn
  this.roomId = roomId
  console.log('uit' + uid + ', conn' + conn + ', roomid' + roomId)
}

var roomMap = new zeroRTCMap()