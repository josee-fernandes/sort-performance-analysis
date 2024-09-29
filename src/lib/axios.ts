import axios from 'axios'

export const placeholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})
