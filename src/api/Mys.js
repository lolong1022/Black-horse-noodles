import axios from '@/utils/requred'
export const getUserInfo = (token) => {
  //   console.log(token)
  return axios({
    url: '/user',
    headers: { Authorization: token }
  })
}
