import {
  SIGNAL_TYPE_NEW_PEER,
  SIGNAL_TYPE_RESP_JOIN
} from '../constant/index.mjs'
import { ZeroRTCMap, Client } from '../utils/index.mjs'

const roomTableMap = new ZeroRTCMap()

export function handleJoin(message, conn) {
  const roomId = message.roomId
  const uid = message.uid

  console.info('uid' + uid + 'try to join room' + roomId)
  var roomMap = roomTableMap.get(roomId)
  if (roomMap == null) {
    roomMap = new ZeroRTCMap()
    roomTableMap.put(roomId, roomMap)
  }

  if (roomMap.size() >= 2) {
    console.error('roomid' + roomId + '已经有两个人存在, 请使用其它房间')
    return
  }

  const client = new Client(uid, conn, roomId)
  roomMap.put(uid, client)

  // 房间加入新人
  if (roomMap.size() > 1) {
    let clients = roomMap.getEntry()
    for (let i in clients) {
      const remoteUid = client[i].key
      if (remoteUid != uid) {
        // 新的加入者
        let jsonMsg = {
          cmd: SIGNAL_TYPE_NEW_PEER,
          remoteUid: uid
        }
        let msg = JSON.stringify(jsonMsg)
        const remoteClient = roomMap.get(remoteUid)
        remoteClient.conn.sendText(msg)

        // 通知自己
        jsonMsg = {
          cmd: SIGNAL_TYPE_RESP_JOIN,
          remoteUid: remoteUid
        }
        msg = JSON.stringify(jsonMsg)
        conn.sendText(msg)
      }
    }
  }
}
