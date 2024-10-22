import axios from 'axios'

export const placeholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const appApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})
