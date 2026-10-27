import axios from 'axios'



export const API = import.meta.env.VITE_API_URL??'https://api.codingscholar.com'

let csrfToken = null
export const setCsrf = (t) => { csrfToken = t }

// reusable fetch function ....

const SAFE = ['GET', 'HEAD', 'OPTIONS']

export async function apiFetch(
  endpoint,
  { method = 'GET', headers = {}, body, params, raw = false, ...rest } = {},
  _retried = false
) {
  const m = method.toUpperCase()
  const isAbsolute = /^https?:/.test(endpoint)
  let url = isAbsolute ? endpoint : `${API}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  if (params) url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params).toString()
  const isOurs = url.startsWith(API) // third-party URLs get no cookies, no CSRF, no refresh

  const h = { ...headers }
  delete h.Authorization // legacy Bearer headers: cookies are the main auth now
  delete h.authorization

  // plain objects -> JSON; FormData/Blob/string are sent untouched
  let payload = body
  if (body && typeof body === 'object' &&
      !(body instanceof FormData) && !(body instanceof Blob) &&
      !(body instanceof URLSearchParams) && !(body instanceof ArrayBuffer)) {
    payload = JSON.stringify(body)
    h['Content-Type'] ??= 'application/json'
  }
  if (isOurs && !SAFE.includes(m) && csrfToken) h['X-CSRFToken'] = csrfToken

  const res = await fetch(url, {
    method: m,
    headers: h,
    body: SAFE.includes(m) ? undefined : payload,
    credentials: isOurs ? 'include' : 'same-origin',
    ...rest, // signal, cache, etc. (can override the defaults above)
  })

  // expired access cookie -> refresh once, then retry the same request
  const isTokenCall = url.includes('/api/token/') && !url.includes('/api/token/me/')
  if (isOurs && res.status === 401 && !_retried && !isTokenCall) {
    let refreshed = false
    try { await refreshSession(); refreshed = true }
    catch { window.dispatchEvent(new Event('auth:logout')) }
    if (refreshed) return apiFetch(endpoint, { method, headers, body, params, raw, ...rest }, true)
  }

  if (raw) return res // you handle the Response yourself (blobs, streams)

  const ct = res.headers.get('content-type') || ''
  const text = await res.text()
  const data = text ? (ct.includes('application/json') ? JSON.parse(text) : text) : null

  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`)
    err.status = res.status
    err.data = data
    err.response = { status: res.status, data } // same shape as axios, so existing catch blocks still work
    throw err
  }
  return data
}

// only touch requests going to OUR api (never third-party calls like xirsys)
const isApi = (c) => {
  const url = c.url || ''
  const full = /^https?:/.test(url) ? url : (c.baseURL || '') + url
  return !!API && full.startsWith(API)
}

const REFRESH_URL = `${API}/api/token/refresh/`
let refreshing = null
const refreshSession = () =>
  (refreshing ??= axios
    .post(REFRESH_URL, null, { withCredentials: true })
    .finally(() => { refreshing = null }))

function setup(instance) {
  instance.interceptors.request.use((config) => {
    if (!isApi(config)) return config
    config.withCredentials = true
    // legacy Bearer headers from old components: strip them, the backend rejects stale ones even when the cookie is valid
    delete config.headers.Authorization
    const method = (config.method || 'get').toLowerCase()
    if (csrfToken && !['get', 'head', 'options'].includes(method)) {
      config.headers['X-CSRFToken'] = csrfToken
    }
    return config
  })

  instance.interceptors.response.use(
    (r) => r,
    async (error) => {
      const original = error.config
      const url = original?.url || ''
      const isTokenCall = url.includes('/api/token/') && !url.includes('/api/token/me/')
      if (error.response?.status === 401 && original && isApi(original) && !original._retry && !isTokenCall) {
        original._retry = true
        try {
          await refreshSession()
          return instance.request(original)
        } catch {
          window.dispatchEvent(new Event('auth:logout'))
        }
      }
      return Promise.reject(error)
    }
  )
}

setup(axios) // existing components using plain `axios` get cookies + refresh with no edits
export const api = axios.create({ baseURL: API }) // for new code
setup(api)