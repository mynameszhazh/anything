import { localUserId, SIGNAL_TYPE_JOIN } from '../const/index.js'

export function dojoin(roomId) {
  const jsonMsg = {
    cmd: SIGNAL_TYPE_JOIN,
    roomId: roomId,
    uid: localUserId
  }

  const message = JSON.stringify(jsonMsg)
}
