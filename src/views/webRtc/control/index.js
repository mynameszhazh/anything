import store from '../../../store/index'
import {
  localUserId,
  SIGNAL_TYPE_ANSWER,
  SIGNAL_TYPE_CANDIDATE,
  SIGNAL_TYPE_JOIN,
  SIGNAL_TYPE_LEAVE,
  SIGNAL_TYPE_OFFER
} from '../const'

let pc = null
let localStream = null
let remoteVideo = null

/**
 * 有新的加入者之后的处理
 */
export function handleRemoteNewPeer(msg) {
  console.log('handleRemoteNewPeer 处理新的加入者')
  store.dispatch('chat/setRemoteUserId', msg.remoteUid)
  doOffer()
}

export function handleResponseJoin(msg) {
  console.log('handleResponseJoin, 我已经加入房间成功了')
  store.dispatch('chat/setRemoteUserId', msg.remoteUid)
}

// 对方离开了
export function handleRemotePeerLeave(msg) {
  console.log('handleRemotePeerLeave')
  remoteVideo.srcObject = null
  if (pc != null) {
    pc.close()
    pc = null
  }
}

function doOffer() {
  console.log(pc, 'store.state.chat.pc')
  if (pc == null) {
    createPeerConnection()
  }
  pc.createOffer()
    .then(createOfferAndSendMessage)
    .catch(handleCreateOfferError)
}

function doAnswer() {
  pc.createAnswer()
    .then(createAnswerAndSendMessage)
    .catch(handleCreateAnswerError)
}

// 可以拿到 sdp
function createOfferAndSendMessage(session) {
  pc.setLocalDescription(session)
    .then(function() {
      let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
      let jsonMsg = {
        cmd: SIGNAL_TYPE_OFFER,
        roomId,
        remoteUid: remoteUserId,
        uid: localUserId,
        // sdp 数据
        msg: JSON.stringify(session)
      }
      let message = JSON.stringify(jsonMsg)
      zeroRTCEngine.sendMessage(message)
      console.log('send offer message: ')
    })
    .catch((err) => {
      console.error('offer setLocalDiscription failed: ' + err)
    })
}

function handleCreateOfferError(err) {
  console.error('handleCreateOfferError: ' + err)
}

function createAnswerAndSendMessage(session) {
  pc.setLocalDescription(session)
    .then(function() {
      let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
      console.log(
        'createAnswerAndSendMessage',
        ' roomId, zeroRTCEngine, remoteUserId ',
        roomId,
        zeroRTCEngine,
        remoteUserId
      )
      let jsonMsg = {
        cmd: SIGNAL_TYPE_ANSWER,
        roomId,
        remoteUid: remoteUserId,
        uid: localUserId,
        // sdp 数据
        msg: JSON.stringify(session)
      }
      let message = JSON.stringify(jsonMsg)
      zeroRTCEngine.sendMessage(message)
      // console.log('send answer message: ' + message)
      console.log('send answer message:')
    })
    .catch((err) => {
      console.error('answer setLocalDiscription failed: ' + err)
    })
}

function handleCreateAnswerError(err) {
  console.error('handleCreateAnswerError: ' + err)
}

function createPeerConnection() {
    var defaultConfiguration = {
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceTransportPolicy: 'relay', //relay 或者
    // 修改ice数组测试效果，需要进行封装
    iceServers: [
      {
        urls: [
          'turn:175.24.179.131:3478?transport=udp',
          'turn:175.24.179.131:3478?transport=tcp' // 可以插入多个进行备选
        ],
        username: 'admin',
        credential: '123456'
      },
      {
        urls: ['stun:175.24.179.131:3478']
      }
    ]
  }

  pc = new RTCPeerConnection(defaultConfiguration) // 音视频通话的核心类
  // 创建一个 pc
  pc = new RTCPeerConnection(null)
  // 自己发送 Candidate 数据
  pc.onicecandidate = handleIceCandidate

  // 添加远程的数据
  pc.ontrack = handleRemoteStreamAdd

  pc.onconnectionstatechange = handleConnectionStateChange
  pc.oniceconnectionstatechange = handleIceConnectionStateChange

  store.dispatch('chat/setPeerConnction', pc)

  localStream = store.state.chat.localStream

  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
}

function handleConnectionStateChange() {
  if (pc != null) {
    console.info('ConnectionState -> ' + pc.connectionState)
  }
}

function handleIceConnectionStateChange() {
  if (pc != null) {
    console.info('IceConnectionState -> ' + pc.iceConnectionState)
  }
}

function handleRemoteStreamAdd(msg) {
  console.log('handleRemoteStreamAdd', msg)
  remoteVideo = store.state.chat.remoteVideo
  store.dispatch('chat/setRemoteStream', msg.streams[0])
  // console.log(msg.streams[0], '12341234', remoteVideo)
  remoteVideo.srcObject = msg.streams[0]
}

function handleIceCandidate(msg) {
  let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
  console.log(
    'handleIceCandidate roomId, zeroRTCEngine, remoteUserId ',
    roomId,
    zeroRTCEngine,
    remoteUserId
  )
  if (msg.candidate) {
    let jsonMsg = {
      cmd: SIGNAL_TYPE_CANDIDATE,
      roomId,
      remoteUid: remoteUserId,
      uid: localUserId,
      msg: JSON.stringify(msg.candidate)
    }
    let message = JSON.stringify(jsonMsg)
    zeroRTCEngine.sendMessage(message)
    console.log('handleIceCandidate message: ')
  } else {
    console.warn('end of candates')
  }
}

export function handleRemoteOffer(message) {
  console.log('handleRemoteOffer', message)
  if (pc == null) {
    createPeerConnection()
  }
  let msg = JSON.parse(message.msg)
  pc.setRemoteDescription(msg)
  doAnswer()
}

export function handleRemoteAnswer(message) {
  console.log('handleRemoteAnswer', message)
  let desc = JSON.parse(message.msg)
  pc.setRemoteDescription(desc)
}

export function handleRemoteCandidate(message) {
  console.log('handleRemoteCandidate', message.msg)
  const jsonMsg = JSON.parse(message.msg)
  console.log(jsonMsg, '1234123412342134')
  var candidateMsg = {
    sdpMLineIndex: jsonMsg.sdpMLineIndex,
    sdpMid: jsonMsg.sdpMid,
    candidate: jsonMsg.candidate
  }
  var candidate = new RTCIceCandidate(candidateMsg)
  pc.addIceCandidate(candidate).catch((err) => {
    console.error('addIceCandidate failed: ' + err)
  })
}

export function dojoin(roomId) {
  let { zeroRTCEngine } = store.state.chat
  const jsonMsg = {
    cmd: SIGNAL_TYPE_JOIN,
    roomId: roomId,
    uid: localUserId
  }
  store.dispatch('chat/setRoomId', roomId)
  const message = JSON.stringify(jsonMsg)
  zeroRTCEngine.sendMessage(message)
  console.log('send join ', roomId, '请求')
}

export function doleave(roomId) {
  let { zeroRTCEngine } = store.state.chat
  const jsonMsg = {
    cmd: SIGNAL_TYPE_LEAVE,
    roomId: roomId,
    uid: localUserId
  }
  const message = JSON.stringify(jsonMsg)
  zeroRTCEngine.sendMessage(message)

  // 离开的处理
  hangup()
}

function hangup() {
  let { localVideo } = store.state.chat
  localVideo.srcObject = null // 0. 关闭自己本地显示
  remoteVideo.srcObject = null // 1. 不显示对方
  closeLocalStream() // 2. 关闭本地流
  if (pc != null) {
    pc.close() // 3. 关闭 pc
    pc = null
  }
}

function closeLocalStream() {
  if (localStream != null) {
    localStream.getTracks().forEach((track) => {
      track.stop()
    })
  }
}
