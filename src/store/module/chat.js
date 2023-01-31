const state = {
  zeroRTCEngine: null,

  pc: null,
  remoteUserId: null,
  roomId: null,

  // test
  foooo: 0,

  localStream: null,
  localVideo: null,
  remoteVideo: null,
  remoteStream: null,
}

const mutations = {
  SET_PC(state, data) {
    state.pc = data
  },
  SET_REMOTE_USER_ID(state, data) {
    state.remoteUserId = data
  },
  SET_ROOM_ID(state, data) {
    state.roomId = data
  },

  SET_OBJECT(state, data) {
    state.foooo = data
  },

  SET_LOCAL_VIDEO(state, data) {
    state.localVideo = data
  },
  SET_LOCAL_STREAM(state, data) {
    state.localStream = data
  },
  SET_REMOTE_VIDEO(state, data) {
    state.remoteVideo = data
  },
  SET_REMOTE_STREAM(state, data) {
    state.remoteStream = data
  },
  SET_ZERO_RTC(state, data) {
    state.zeroRTCEngine = data
  }
}
const actions = {
  setPeerConnction({ commit }, data) {
    commit('SET_PC', data)
  },
  setRoomId({ commit }, data) {
    commit('SET_ROOM_ID', data)
  },
  setRemoteUserId({ commit }, data) {
    commit('SET_REMOTE_USER_ID', data)
  },
  setObject({ commit }, data) {
    commit('SET_OBJECT', data)
  },
  setLocalVideo({ commit }, data) {
    commit('SET_LOCAL_VIDEO', data)
  },
  setLocalStream({ commit }, data) {
    commit('SET_LOCAL_STREAM', data)
  },
  setRemoteVideo({ commit }, data) {
    commit('SET_REMOTE_VIDEO', data)
  },
  setRemoteStream({ commit }, data) {
    commit('SET_REMOTE_STREAM', data)
  },
  setZeroRtc({ commit }, data) {
    commit('SET_ZERO_RTC', data)
  },
}

const getter = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter
}
