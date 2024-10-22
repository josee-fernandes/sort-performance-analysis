import axios from 'axios'

export const placeholderApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLACEHOLDER_API_BASE_URL,
})

export const appApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
})
