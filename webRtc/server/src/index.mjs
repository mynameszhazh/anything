import ws from 'nodejs-websocket'
import {
  SIGNAL_TYPE_ANSWER,
  SIGNAL_TYPE_CANDIDATE,
  SIGNAL_TYPE_JOIN,
  SIGNAL_TYPE_LEAVE,
  SIGNAL_TYPE_OFFER
} from './constant/index.mjs'
import {
  handleJoin,
  handleLeave,
  handleOffer,
  handleAnswer,
  handleCandidate,
  handleForceLeave
} from './contrl/room.mjs'
const port = 8010

const server = ws.createServer((conn) => {
  console.log('创建一个连接-----------')
  conn.client = null
  conn.on('text', function(str) {
    // console.log('revn msg:' + str)
    const jsonMsg = JSON.parse(str)

    switch (jsonMsg.cmd) {
      case SIGNAL_TYPE_JOIN:
        conn.client = handleJoin(jsonMsg, conn)
        break
      case SIGNAL_TYPE_LEAVE:
        handleLeave(jsonMsg, conn)
        break
      case SIGNAL_TYPE_OFFER:
        handleOffer(jsonMsg, conn)
        break
      case SIGNAL_TYPE_ANSWER:
        handleAnswer(jsonMsg, conn)
        break
      case SIGNAL_TYPE_CANDIDATE:
        handleCandidate(jsonMsg, conn)
        break
    }
  })
  conn.on('close', function(code, reason) {
    console.log('close code:' + code, 'close reason:' + reason)
    if (conn.client != null) {
      // 强制让客户端从房间退出
      handleForceLeave(conn.client)
    }
  })
  conn.on('error', function(err) {
    console.log('error msr:')
  })
})

server.listen(port, () => {
  console.log('server running...', port)
})
