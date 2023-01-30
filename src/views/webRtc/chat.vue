<template>
  <div class="chat">
    <h1>xjh 视频聊天程序</h1>
    <div class="btns">
      <el-input v-model="roomId" placeholder="请输入房间id" />
      <el-button id="joinBtn" ref="joinBtn" type="primary" @click="handleJoin"
        >加入</el-button
      >
      <el-button id="leaveBtn" ref="leaveBtn" type="danger" @click="handleLeave"
        >离开</el-button
      >
    </div>
    <div class="videos" ref="videos">
      <video
        style="margin: 20px;"
        id="localVideo"
        ref="localVideo"
        muted
        controls
        autoplay
        playsinline
      ></video>
      <video
        style="margin: 20px;"
        id="remoteVideo"
        ref="remoteVideo"
        muted
        controls
        autoplay
        playsinline
      ></video>
    </div>
  </div>
</template>

<script>
import { ZeroRTCEngine } from './utils/index'
import { SIGNAL_TYPE_JOIN, localUserId, SIGNAL_TYPE_LEAVE } from './const/index'
export default {
  data() {
    return {
      roomId: '',
      localVideo: null,
      localStream: null,
      remoteVideo: null,
      remoteStream: null,
      zeroRTCEngine: null
    }
  },
  created() {
    this.initWebSocket()
  },
  methods: {
    initWebSocket() {
      // this.zeroRTCEngine = new ZeroRTCEngine('ws://175.24.179.131:8010')
      this.zeroRTCEngine = new ZeroRTCEngine('ws://localhost:8010')
      this.zeroRTCEngine.createWebsocket()
    },
    handleJoin() {
      if (!this.roomId) return
      let contrains = {
        audio: true,
        video: true
      }
      navigator.mediaDevices
        .getUserMedia(contrains)
        .then(this.handleJoinSuccess)
        .catch(this.handleJoinError)
    },
    dojoin(roomId) {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_JOIN,
        roomId: roomId,
        uid: localUserId
      }
      const message = JSON.stringify(jsonMsg)
      this.zeroRTCEngine.sendMessage(message)
    },
    doleave() {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_LEAVE,
        roomId: roomId,
        uid: localUserId
      }
      const message = JSON.stringify(jsonMsg)
      this.zeroRTCEngine.sendMessage(message)
    },
    handleJoinSuccess(stream) {
      console.log('handleJoinSuccess 加入房间client 成功')
      // 获取成功加入到 房间里面去
      this.dojoin(this.roomId)

      this.localVideo = this.$refs.localVideo
      // console.log(this.$refs.joinBtn, this.$refs.videos, 'V')
      this.localVideo.srcObject = stream
      this.localStream = stream
    },
    handleJoinError(err) {
      console.error('errrrr', err)
    },
    handleLeave() {
      console.log('handleLeave 处理房间离开')
      this.doleave()
      if (this.localVideo) {
        this.localVideo.srcObject = null
        this.localStream = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-start;

  #joinBtn {
    margin: 0 20px;
  }
}

.videos {
  height: 500px;

  video {
    width: 200px;
    height: 200px;
  }
}
</style>
