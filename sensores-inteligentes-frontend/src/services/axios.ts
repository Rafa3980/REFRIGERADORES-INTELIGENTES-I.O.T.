import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token') || 'sem token nos cookies'

export const api_sidebeta = axios.create({
  baseURL: 'https://segtron.sitebeta.com.br/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

export const api_develop = axios.create({
  baseURL: 'https://api.github.com/users/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
