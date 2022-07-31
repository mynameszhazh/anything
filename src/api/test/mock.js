import data from '../index'
const { axios } = data
export function getXJHInfo() {
  return axios.get('api/courses').then(res => {
    return res
  })
}