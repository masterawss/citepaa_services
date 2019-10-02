import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://citepaa_services_api.test/api'
})


export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
