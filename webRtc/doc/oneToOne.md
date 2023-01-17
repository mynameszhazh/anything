# 一对一通话的原理

> 主要关注 RTCPeerConnection

## 信令设计

- 通过标记服务器,设置多个服务器之间的数据传递方式

## 媒体协商

- 创建关键对象

  - `new RTCPeerConnection()`
    - 然后进行顶顶 onicecandidate 等回调
  - addTrack(track ,localStream)
    - 把一些数据流加到本地
  - createOffer & setLocalDescription

    - createOffer
      - 拿到浏览器支持的媒体信息
    - setLocalDescription
      - 本地保存这些信息

  - createAnswer & setLocalDescription
    - createAnswer
      - 拿到浏览器支持的媒体信息, 但却是一个应答者进行创建的
    - setLocalDescription
      - 本地保存这些信息

## 加入 Stream/Track

- 加入 标记

## 网络协商

> iceCandidate 进行网络的一些双向传递

- iceCandidate
- stun
- turn
