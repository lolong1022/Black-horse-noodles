import axios from '@/utils/requred'
export const getLogin = (username, password) => {
  return axios({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
