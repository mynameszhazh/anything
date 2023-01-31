import store from '../../../store/index'
import {
  localUserId,
  SIGNAL_TYPE_ANSWER,
  SIGNAL_TYPE_CANDIDATE,
  SIGNAL_TYPE_OFFER
} from '../const'

let pc = null

/**
 * 有新的加入者之后的处理
 */
export function handleRemoteNewPeer(msg) {
  console.log('handleRemoteNewPeer', msg)
  store.dispatch('chat/setRemoteUserId', msg.remoteUid)
  doOffer()
}

export function handleResponseJoin(msg) {
  console.log('handleResponseJoin')
}

// 需要状态共享(vuex)
export function handleRemotePeerLeave(msg) {}

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
  pc.setLocalDiscription(session)
    .then(function() {
      let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
      let jsonMsg = {
        cmd: SIGNAL_TYPE_OFFER,
        roomid: roomId,
        remoteUid: remoteUserId,
        uid: localUserId,
        // sdp 数据
        msg: JSON.stringify(session)
      }
      let message = JSON.stringify(jsonMsg)
      zeroRTCEngine.sendMessage(message)
      console.log('send offer message: ' + message)
    })
    .catch((err) => {
      console.error('offer setLocalDiscription failed: ' + err)
    })
}

function handleCreateOfferError(err) {
  console.error('handleCreateOfferError: ' + err)
}

function createAnswerAndSendMessage(session) {
  pc.setLocalDiscription(session)
    .then(function() {
      let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
      let jsonMsg = {
        cmd: SIGNAL_TYPE_ANSWER,
        roomid: roomId,
        remoteUid: remoteUserId,
        uid: localUserId,
        // sdp 数据
        msg: JSON.stringify(session)
      }
      let message = JSON.stringify(jsonMsg)
      zeroRTCEngine.sendMessage(message)
      console.log('send answer message: ' + message)
    })
    .catch((err) => {
      console.error('answer setLocalDiscription failed: ' + err)
    })
}

function handleCreateAnswerError(err) {
  console.error('handleCreateAnswerError: ' + err)
}

function createPeerConnection() {
  // 创建一个 pc
  const pc = new RTCPeerConnection(null)
  // 自己发送 Candidate 数据
  pc.onicecandidate = handleIceCandidate

  // 添加远程的数据
  pc.ontrack = handleRemoteStreamAdd

  store.dispatch('chat/setPeerConnction', pc)

  let localStream = store.state.chat.localStream

  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))
}

function handleRemoteStreamAdd(msg) {
  console.log('handleRemoteStreamAdd', msg)
  let remoteVideo = store.state.chat.remoteVideo
  store.dispatch('chat/setRemoteStream', msg.streams[0])
  remoteVideo.srcObject = msg.streams[0]
}

function handleIceCandidate(msg) {
  console.log('handleIceCandidate', msg)
  let { roomId, zeroRTCEngine, remoteUserId } = store.state.chat
  if (msg.candidate) {
    let jsonMsg = {
      cmd: SIGNAL_TYPE_CANDIDATE,
      roomid: roomId,
      remoteUid: remoteUserId,
      uid: localUserId,
      msg: JSON.stringify(msg.candidate)
    }
    let message = JSON.stringify(jsonMsg)
    zeroRTCEngine.sendMessage(message)
    console.log('handleIceCandidate message: ' + message)
  } else {
    console.warn('end of candates')
  }
}

export function handleRemoteOffer(message) {
  console.log('handleRemoteOffer', message)
  if (pc == null) {
    createPeerConnection()
  }
  let msg = JSON.stringify(message.msg)
  pc.setRemoteDiscription(msg)
  doAnswer()
}

export function handleRemoteAnswer(message) {
  console.log('handleRemoteAnswer', message)
  let desc = JSON.parse(message.msg)
  pc.setRemoteDescription(desc)
}

export function handleRemoteCandidate(message) {
  console.log('handleRemoteCandidate', message)
  const candidate = JSON.parse(message.msg)
  pc.addIceCandidate(candidate).catch((e) => {
    console.error('addIceCandidate failed: ' + e.name)
  })
}
