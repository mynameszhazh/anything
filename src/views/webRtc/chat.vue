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
import { mapState } from 'vuex'
import { ZeroRTCEngine } from './utils/index'
import {dojoin, doleave} from './control/index'
export default {
  data() {
    return {
      roomId: ''
    }
  },
  computed: {
    ...mapState('chat', {
      localVideo: 'localVideo',
      localStream: 'localStream',
      remoteVideo: 'remoteVideo',
      zeroRTCEngine: 'zeroRTCEngine',
      remoteStream: 'remoteStream'
    })
  },
  created() {
    this.initWebSocket()
  },
  mounted () {
  },
  methods: {
    initWebSocket() {
      // this.zeroRTCEngine = new ZeroRTCEngine('ws://175.24.179.131:8010') 
      // this.$store.dispatch('chat/setZeroRtc', new ZeroRTCEngine('ws://localhost:8010'))
      this.$store.dispatch('chat/setZeroRtc', new ZeroRTCEngine('ws://175.24.179.131:8010'))
      this.zeroRTCEngine.createWebsocket();
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
    handleJoinSuccess(stream) {
      console.log('handleJoinSuccess 摄像头打开成功')
      // 获取成功加入到 房间里面去
      dojoin(this.roomId)

      this.$store.dispatch('chat/setLocalVideo', this.$refs.localVideo)
      // 这里同时将远程的video 加入 vuex
      this.$store.dispatch('chat/setRemoteVideo', this.$refs.remoteVideo)

      this.localVideo.srcObject = stream
      this.$store.dispatch('chat/setLocalStream', stream)
    },
    handleJoinError(err) {
      console.error('errrrr', err)
    },
    handleLeave() {
      console.log('handleLeave 处理房间离开')
      doleave(this.roomId)
      if (this.localVideo) {
        this.localVideo.srcObject = null
        this.$store.dispatch('chat/setLocalStream', null)
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
