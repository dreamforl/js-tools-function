type Fun = (res: unknown) => unknown
type Use = (callback: Fun, errorCallback: Fun) => void

interface Params {
  [params: string]: any
}
export type ResponseType = 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData'

export interface FetchOptions {
  params?: Params
  responseType?: ResponseType
  body?: string
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
  headers?: Params
  withCredentials?: boolean
  [params: string]: any
}
interface Interceptor {
  options: FetchOptions
  request: { use: Use }
  response: {
    noTransform: { use: Use }
    transform: { use: Use }
  }
}
