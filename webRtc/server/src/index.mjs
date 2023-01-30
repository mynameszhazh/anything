import ws from 'nodejs-websocket'
import { SIGNAL_TYPE_JOIN } from './constant/index.mjs'
import { handleJoin } from './contrl/room.mjs'
const port = 8010

const server = ws.createServer((conn) => {
  console.log('创建一个连接-----------')

  conn.on('text', function(str) {
    console.log('revn msg:' + str)
    const jsonMsg = JSON.parse(str)

    switch (jsonMsg.cmd) {
      case SIGNAL_TYPE_JOIN:
        handleJoin(jsonMsg, conn)
        break
    }
  })
  conn.on('close', function(code, reason) {
    console.log('close code:' + code, 'close reason:' + reason)
  })
  conn.on('error', function(err) {
    console.log('error msr:')
  })
})

server.listen(port, () => {
  console.log('server running...', port)
})
