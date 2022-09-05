<template>
  <div
    class="container"
    ref="containerDom"
    @mouseenter="stopAutoPlay"
    @mouseleave="autoPlay"
  >
    <!--  图片列表  -->
    <ul
      class="ul-img"
      ref="ulDom"
      :style="{ left: offsetLeft }"
    >
      <li
        v-for="(item, index) of 5"
        :key="index"
        class="li-img"
      >
        {{ item }}
      </li>
    </ul>

    <!--  上一张、下一张按钮  -->
    <div
      class="prev"
      ref="prevDom"
      @click="prevFun"
    >
      <span>&lt;</span>
    </div>
    <div
      class="next"
      ref="nextDom"
      @click="nextFun"
    >
      <span>&gt;</span>
    </div>
    <!-- 数字切换按钮 -->
    <div class="num-box" ref="numUlDom">
      <ul class="num-ul" ref="numList">
        <li
          v-for="(item, index) of 5"
          :key="item"
          :data-index="index"
          :class="
            currentIndex == index
              ? 'active_num'
              : ''
          "
          @click="numClick(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0, // 当前显示的图片索引
      timer: null, // 自动播放定时器
      offsetLeft: 0,
    };
  },
  mounted() {
    // 开启自动播放
    this.autoPlay();
  },
  methods: {
    // 切换上一张
    prevFun() {
      if (this.currentIndex === 0) {
        this.currentIndex = 4;
      } else {
        --this.currentIndex;
      }
      this.offsetLeft = `-${this.currentIndex *
        600}px`;
    },
    // 切换下一张
    nextFun() {
      if (this.currentIndex === 4) {
        this.currentIndex = 0; // 重新播放第一张
      } else {
        ++this.currentIndex;
      }
      this.offsetLeft = `-${this.currentIndex *
        600}px`;
    },
    // 关闭自动播放
    stopAutoPlay() {
      // 清除定时器
      clearInterval(this.timer);
    },
    // 循环播放
    autoPlay() {
      this.timer = setInterval(
        this.nextFun,
        1000
      );
    },
    numClick(index) {
      if (index == undefined) {
        return;
      }
      const currentIndex = Number(index);
      this.currentIndex = index;
      this.offsetLeft = `-${currentIndex *
        600}px`;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  background-color: gray;
  overflow: hidden;
}

.ul-img {
  position: absolute;
  display: flex;
  width: 4200px;
  transition: 0.5s;
  height: 400px;
  left: 0;
  padding: 0;
  margin: 0;
}

.li-img {
  list-style: none;
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aquamarine;
  font-size: 30px;
  font-weight: 800;
  border: 1px solid #ccc;
}

/* 上一张、下一张 */
.prev,
.next {
  position: absolute;
  height: 400px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.prev span,
.next span {
  display: block;
  color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

/* 数字切换按钮 */
.num-box {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);
  z-index: 2;
}

.num-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
    color: #fff;
    margin: 0 4px;
    cursor: pointer;
    user-select: none;
  }
  .active_num {
    background-color: #ccc;
  }
}
</style>
