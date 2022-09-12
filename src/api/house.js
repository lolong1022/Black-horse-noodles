import axios from '@/utils/requred'
// 获取id
export const getCityHouseApi = () => {
  return axios({
    url: '/houses/condition',
    params: {
      id: 'AREA|dbf46d32-7e76-1196'
    }
  })
}
export const getCityHouseID = () => {
  return axios({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}
// 筛选房子的具体信息
export const getFilterhouseInfo = (params) => {
  return axios({
    url: '/houses'
  })
}
