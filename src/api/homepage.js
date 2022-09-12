import axios from '@/utils/requred'
/**
 * 轮播图
 * @returns promise
 */
export const getFigure = () => {
  return axios({
    url: '/home/swiper'
  })
}
export const getGrops = () => {
  return axios({
    url: '/home/groups'
  })
}
