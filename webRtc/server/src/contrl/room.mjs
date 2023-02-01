import {
  SIGNAL_TYPE_NEW_PEER,
  SIGNAL_TYPE_PEER_LEAVE,
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
    return null
  }

  const client = new Client(uid, conn, roomId)
  roomMap.put(uid, client)

  // 房间加入新人
  if (roomMap.size() > 1) {
    let clients = roomMap.getEntry()
    for (let i in clients) {
      const remoteUid = clients[i].key
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

  return client
}

export function handleLeave(message, conn) {
  const roomId = message.roomId
  const uid = message.uid

  console.info('uid' + uid + 'try to leave room' + roomId)
  var roomMap = roomTableMap.get(roomId)
  if (roomMap == null) {
    console.info('handleLeave 房间是空的')
    return
  }
  // 这个
  roomMap.remove(uid)

  // 房间还剩下其它人
  if (roomMap.size() === 1) {
    let clients = roomMap.getEntry()
    for (let i in clients) {
      const remoteUid = clients[i].key
      if (remoteUid != uid) {
        let jsonMsg = {
          cmd: SIGNAL_TYPE_PEER_LEAVE,
          remoteUid: uid
        }
        let msg = JSON.stringify(jsonMsg)
        const remoteClient = roomMap.get(remoteUid)
        if (remoteClient) {
          remoteClient.conn.sendText(msg)
        }
      }
    }
  }
  // 告诉自己离开成功了
}

export function handleOffer(message, conn) {
  const roomId = message.roomId
  const uid = message.uid
  const remoteUid = message.remoteUid

  console.info(
    `handleOffer -> roomid: ${roomId} -> uid ${uid} -> remoteUid: ${remoteUid}`
  )
  var roomMap = roomTableMap.get(roomId)
  if (roomMap == null) {
    console.info('handleOffer 房间是空的')
    return
  }

  if (roomMap.get(uid) == null) {
    console.error(uid + '不在房间内', roomId)
    return
  }

  // 向远程发送
  var remoteClient = roomMap.get(remoteUid)
  if (remoteClient) {
    var msg = JSON.stringify(message)
    remoteClient.conn.sendText(msg)
  } else {
    console.error('发送offer to remoteUid: ' + remoteUid)
  }
}

export function handleAnswer(message, conn) {
  const roomId = message.roomId
  const uid = message.uid
  const remoteUid = message.remoteUid

  console.info(
    `handleAnswer -> roomid: ${roomId} -> uid ${uid} -> remoteUid: ${remoteUid}`
  )
  var roomMap = roomTableMap.get(roomId)
  if (roomMap == null) {
    console.info('handleAnswer 房间是空的')
    return
  }

  if (roomMap.get(uid) == null) {
    console.error('handleAnswe can find then roomId', roomId)
    return
  }

  // 向远程发送
  var remoteClient = roomMap.get(remoteUid)
  if (remoteClient) {
    var msg = JSON.stringify(message)
    remoteClient.conn.sendText(msg)
  } else {
    console.error("answer can't find remoteUid: " + remoteUid)
  }
}

export function handleCandidate(message, conn) {
  const roomId = message.roomId
  const uid = message.uid
  const remoteUid = message.remoteUid

  console.info(
    `handleCandidate -> roomid: ${roomId} -> uid ${uid} -> remoteUid: ${remoteUid}`
  )
  var roomMap = roomTableMap.get(roomId)
  if (roomMap == null) {
    console.info('handleCandidate 房间是空的')
    return
  }

  if (roomMap.get(uid) == null) {
    console.error('handleCandidate can find then roomId', roomId)
    return
  }

  // 向远程发送
  var remoteClient = roomMap.get(remoteUid)
  if (remoteClient) {
    var msg = JSON.stringify(message)
    remoteClient.conn.sendText(msg)
  } else {
    console.error("candidate can't find remoteUid: " + remoteUid)
  }
}

export function handleForceLeave(client) {
    var roomId = client.roomId;
    var uid = client.uid;

    // 1. 先查找房间号
    var roomMap = roomTableMap.get(roomId);
    if (roomMap == null) {
        console.warn("handleForceLeave can't find then roomId " + roomId);
        return;
    }

    // 2. 判别uid是否在房间
    if (!roomMap.contains(uid)) {
        console.info("uid: " + uid +" have leave roomId " + roomId);
        return;
    }

    // 3.走到这一步，说明客户端没有正常离开，所以我们要执行离开程序
    console.info("uid: " + uid + " force leave room " + roomId);

    roomMap.remove(uid);        // 删除发送者
    if(roomMap.size() >= 1) {
        var clients = roomMap.getEntrys();
        for(var i in clients) {
            var jsonMsg = {
                'cmd': 'peer-leave',
                'remoteUid': uid // 谁离开就填写谁
            };
            var msg = JSON.stringify(jsonMsg);
            var remoteUid = clients[i].key;
            var remoteClient = roomMap.get(remoteUid);
            if(remoteClient) {
                console.info("notify peer:" + remoteClient.uid + ", uid:" + uid + " leave");
                remoteClient.conn.sendText(msg);
            }
        }
    }
}
