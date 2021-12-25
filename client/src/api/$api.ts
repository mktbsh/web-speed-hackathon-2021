/* eslint-disable */
// prettier-ignore
import { AspidaClient, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './api/v1/me'
// prettier-ignore
import { Methods as Methods1 } from './api/v1/posts'
// prettier-ignore
import { Methods as Methods2 } from './api/v1/signin'
// prettier-ignore
import { Methods as Methods3 } from './api/v1/signup'
// prettier-ignore
import { Methods as Methods4 } from './terms.json'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/me'
  const PATH1 = '/api/v1/posts'
  const PATH2 = '/api/v1/signin'
  const PATH3 = '/api/v1/signup'
  const PATH4 = '/terms.json'
  const GET = 'GET'
  const POST = 'POST'

  return {
    api: {
      v1: {
        me: {
          get: (option?: { config?: T }) =>
            fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`
        },
        posts: {
          get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json(),
          $get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
          post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
            fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json(),
          $post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
            fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
            `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        signin: {
          post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
            fetch<Methods2['post']['resBody']>(prefix, PATH2, POST, option).json(),
          $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
            fetch<Methods2['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH2}`
        },
        signup: {
          post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
            fetch<Methods3['post']['resBody']>(prefix, PATH3, POST, option).json(),
          $post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
            fetch<Methods3['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH3}`
        }
      }
    },
    terms_json: {
      get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
