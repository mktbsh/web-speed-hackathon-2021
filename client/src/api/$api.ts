/* eslint-disable */
// prettier-ignore
import { AspidaClient, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './api/v1/me'
// prettier-ignore
import { Methods as Methods1 } from './api/v1/posts'
// prettier-ignore
import { Methods as Methods2 } from './api/v1/posts/_id@string'
// prettier-ignore
import { Methods as Methods3 } from './api/v1/posts/_id@string/comments'
// prettier-ignore
import { Methods as Methods4 } from './api/v1/signin'
// prettier-ignore
import { Methods as Methods5 } from './api/v1/signup'
// prettier-ignore
import { Methods as Methods6 } from './api/v1/users/_username@string'
// prettier-ignore
import { Methods as Methods7 } from './api/v1/users/_username@string/posts'
// prettier-ignore
import { Methods as Methods8 } from './terms.json'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/me'
  const PATH1 = '/api/v1/posts'
  const PATH2 = '/comments'
  const PATH3 = '/api/v1/signin'
  const PATH4 = '/api/v1/signup'
  const PATH5 = '/api/v1/users'
  const PATH6 = '/posts'
  const PATH7 = '/terms.json'
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
          _id: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`

            return {
              comments: {
                get: (option: { query: Methods3['get']['query'], config?: T }) =>
                  fetch<Methods3['get']['resBody']>(prefix, `${prefix3}${PATH2}`, GET, option).json(),
                $get: (option: { query: Methods3['get']['query'], config?: T }) =>
                  fetch<Methods3['get']['resBody']>(prefix, `${prefix3}${PATH2}`, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
                  `${prefix}${prefix3}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              get: (option?: { config?: T }) =>
                fetch<Methods2['get']['resBody']>(prefix, prefix3, GET, option).json(),
              $get: (option?: { config?: T }) =>
                fetch<Methods2['get']['resBody']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
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
          post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
            fetch<Methods4['post']['resBody']>(prefix, PATH3, POST, option).json(),
          $post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
            fetch<Methods4['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH3}`
        },
        signup: {
          post: (option: { body: Methods5['post']['reqBody'], config?: T }) =>
            fetch<Methods5['post']['resBody']>(prefix, PATH4, POST, option).json(),
          $post: (option: { body: Methods5['post']['reqBody'], config?: T }) =>
            fetch<Methods5['post']['resBody']>(prefix, PATH4, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH4}`
        },
        users: {
          _username: (val3: string) => {
            const prefix3 = `${PATH5}/${val3}`

            return {
              posts: {
                get: (option?: { query?: Methods7['get']['query'], config?: T }) =>
                  fetch<Methods7['get']['resBody']>(prefix, `${prefix3}${PATH6}`, GET, option).json(),
                $get: (option?: { query?: Methods7['get']['query'], config?: T }) =>
                  fetch<Methods7['get']['resBody']>(prefix, `${prefix3}${PATH6}`, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get'; query: Methods7['get']['query'] }) =>
                  `${prefix}${prefix3}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              get: (option?: { config?: T }) =>
                fetch<Methods6['get']['resBody']>(prefix, prefix3, GET, option).json(),
              $get: (option?: { config?: T }) =>
                fetch<Methods6['get']['resBody']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          }
        }
      }
    },
    terms_json: {
      get: (option?: { config?: T }) =>
        fetch<Methods8['get']['resBody']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<Methods8['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH7}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
