const state = {
  count: 0
}

const mutations = {
  ADD(state, data) {
    state.count += data
  }
}
const actions = {
  add({commit}, data) {
    commit('ADD', data)
  }
}

const getter = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter
}