import store from '../../../store/index'

export function handleRemoteNewPeer(msg) {
  console.log('handleRemoteNewPeer')
  doOffer()
}

export function handleResponseJoin(msg) {
  console.log('handleResponseJoin')
}

// 需要状态共享(vuex)
export function handleRemotePeerLeave(msg) {
  store.dispatch('chat/add', 123)
}


function doOffer() {

}