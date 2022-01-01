<template>
  <div>
  </div>
</template>

<script>
import * as rrweb from 'rrweb'
import 'rrweb-player/dist/style.css'
// import { eventWithTime } from '@rrweb/types'
export default {
  data() {
    return {
      events: [],
      stopFn: null
    }
  },
  mounted() {
    this.onStopRecord()
  },
  destroyed() {
    this.onStopRecord()
  },
  methods: {
    onStopRecord() {
      // console.log("结束录制");
      // stopFn!({ UNSAFE_replayCanvas: true });
      // userStore.setEvent(events);
    },
    onStartRecord() {
      console.log('启动录制')
      this.stopFn = rrweb.record({
        emit(event) {
          // 用任意方式存储 event
          console.log('event(startRecord): ' + JSON.stringify(event))
          this.events.push(event)
        },
        recordCanvas: true
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
