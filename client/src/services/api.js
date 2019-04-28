import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://loclhost:8081'
  })
}
