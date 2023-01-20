let zeroRTCEngine = null
/**
 * wsUrl: websocket 的地址
 */
export class ZeroRTCEngine {
  constructor(wsUrl) {
    // websocket url
    this.wsUrl = wsUrl
    // websocket 对象
    this.signling = null

    zeroRTCEngine = this
  }

  createWebsocket() {
    zeroRTCEngine.signling = new WebSocket(this.wsUrl)

    zeroRTCEngine.signling.onopen = function(ev) {
      zeroRTCEngine.onOpen(ev)
    }

    zeroRTCEngine.signling.onmessage = function(ev) {
      zeroRTCEngine.onMessage(ev)
    }

    zeroRTCEngine.signling.onerror = function(ev) {
      zeroRTCEngine.onError(ev)
    }
    zeroRTCEngine.signling.onclose = function(ev) {
      zeroRTCEngine.onClose(ev)
    }
  }

  sendMessage(message) {
    this.signling.send(message)
  }

  /**
   * websocket数据的监听
   */
  onOpen() {
    console.log('onOpen')
  }
  onMessage(event) {
    console.log('onMessage', event)
  }
  onError(err) {
    console.error('onError', err)
  }
  onClose(event) {
    console.log('onClose', event)
  }
}
