import {
  SIGNAL_TYPE_NEW_PEER,
  SIGNAL_TYPE_PEER_LEAVE,
  SIGNAL_TYPE_RESP_JOIN
} from '../const/index.js'
import {
  handleRemoteNewPeer,
  handleRemotePeerLeave,
  handleResponseJoin
} from '../control/index.js'

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
    console.log('send msg', message)
    this.signling.send(message)
  }

  /**
   * websocket数据的监听
   */
  onOpen() {
    console.log('onOpen')
  }
  onMessage(event) {
    console.log('onMessage', event.data)
    var jsonMsg = JSON.parse(event.data)
    switch (jsonMsg.cmd) {
      case SIGNAL_TYPE_NEW_PEER:
        handleRemoteNewPeer(jsonMsg)
        break
      case SIGNAL_TYPE_RESP_JOIN:
        handleResponseJoin(jsonMsg)
        break
      case SIGNAL_TYPE_PEER_LEAVE:
        handleRemotePeerLeave(jsonMsg)
        break
      default:
        break
    }
  }
  onError(err) {
    console.error('onError', err)
  }
  onClose(event) {
    console.log('onClose', event)
  }
}
