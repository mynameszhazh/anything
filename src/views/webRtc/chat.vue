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
    <div class="videos">
      <video
        id="localVideo"
        ref="localVideo"
        muted
        controls
        autoplay
        playsinline
      ></video>
      <video id="remoteVideo" ref="remoteVideo" autoplay playsinline></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: "",
      localVideo: null,
    };
  },
  methods: {
    handleJoin() {
      let contrains = {
        audio: true,
        video: true,
      };
      navigator.mediaDevices
        .getUserMedia(contrains)
        .then(this.handleJoinSuccess)
        .catch(this.handleJoinError);
    },
    handleJoinSuccess(stream) {
      this.localVideo = this.$refs.localVideo;
      this.localVideo.srcObject = stream;
    },
    handleJoinError(err) {
      console.error("errrrr", err);
    },
    handleLeave() {
      if (this.localVideo) {
        this.localVideo.srcObject = null;
      }
    },
  },
};
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
