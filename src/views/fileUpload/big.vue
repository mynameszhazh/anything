<template>
  <div>
    <div>
      <input type="file" @change="handleFileChange" />
      <el-button type="primary" @click="handleUpload" 
        >upload</el-button
      >
      <el-button @click="handlePause" v-if="isPaused">pause</el-button>
      <el-button @click="handleResume" v-else>resume</el-button>
    </div>
    <div>
      <div>
        <div>calculate chunk hash</div>
        <el-progress :percentage="hashPercentage"></el-progress>
      </div>
      <div>
        <div>percentage</div>
        <el-progress :percentage="fakeUploadPercentage"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '../../api/request'
// 切片大小
// the chunk size
const SIZE = 10 * 1024 * 1024

const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}

export default {
  data: () => ({
    Status,
    container: {
      file: null,
      hash: '',
      worker: null
    },
    isPaused: true,
    data: [],
    requestList: [],
    hashPercentage: 0,
    // 当暂停时会取消 xhr 导致进度条后退
    // 为了避免这种情况，需要定义一个假的进度条
    // use fake progress to avoid progress backwards when upload is paused
    fakeUploadPercentage: 0
  }),
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0
      const loaded = this.data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    }
  },
  watch: {
    uploadPercentage(now) {
      if (now > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = now
      }
    }
  },
  methods: {
    async handleResume() {
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      await this.uploadChunks(uploadedList)
    },
    async verifyUpload(filename, fileHash) {
      const { data } = await request({
        url: 'http://localhost:3000/verify',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          filename,
          fileHash
        })
      })
      return JSON.parse(data)
    },
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    // 生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      return fileChunkList
    }, // 上传切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, fileHash, index }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', fileHash)
          formData.append('filename', this.container.file.name)
          return { formData, index }
        })
        .map(({ formData, index }) =>
          request({
            url: 'http://localhost:3000',
            data: formData,
            onProgress: this.createProgressHandler(this.data[index]),
            requestList: this.requestList
          })
        )
      // 并发请求
      await Promise.all(requestList)
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
      if (uploadedList.length + requestList.length === this.data.length) {
        await this.mergeRequest()
      }
    },
    // 生成文件 hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise(resolve => {
        // 添加 worker 属性
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({ fileChunkList })
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data
          this.hashPercentage = parseInt(percentage.toFixed(2))
          if (hash) {
            resolve(hash)
          }
        }
      })
    },
    async mergeRequest() {
      await request({
        url: 'http://localhost:3000/merge',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          filename: this.container.file.name,
          hashName: this.container.hash,
          size: SIZE
        })
      })
    },
    async handleUpload() {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.container.hash = await this.calculateHash(fileChunkList)
      const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      // console.log(shouldUpload, 142)
      if (!shouldUpload) {
        this.$message.success('skip upload：file upload success')
        return
      }

      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        fileHash: this.container.hash + '-' + index,
        index,
        // 文件名 数组下标
        hash: this.container.file.name + '-' + index,
        size: file.size,
        // 初始百分比
        percentage: uploadedList.includes(index) ? 100 : 0
      }))
      await this.uploadChunks(uploadedList)
    },
    createProgressHandler(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    },
    // 暂停上传
    handlePause() {
      this.isPaused = false
      this.requestList.forEach(xhr => xhr?.abort())
      this.requestList = []
    }
  }
}
</script>
<Fieldset></Fieldset>
<style lang="less" scoped></style>
