import { Hono } from 'hono'
import { json } from 'hono-json'

import { honoThrow } from './index.js'

describe('hono-throw', () => {
  it('No app', async () => {
    const app = new Hono()
    try {
      honoThrow(app)
    } catch (e) {
      expect(e.message).toBe('No app')
    }
  })

  it('throw with message', async () => {
    const app = new Hono()
    honoThrow(app)
    app.get('/', (c) => {
      c.throw(400, 'error!!!')
    })

    const res = await app.request('/')
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('error!!!')
  })

  it('throw with object', async () => {
    const app = new Hono()
    app.use(honoThrow())
    app.get('/', (c) => {
      c.throw(400, { message: 'error!!!' })
    })

    const res = await app.request('/')
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('error!!!')
  })

  it('with hono-json', async () => {
    const app = new Hono()
    app.use(honoThrow())
    app.use(json(app))
    app.get('/', (c) => {
      c.throw(400, 'error!!!')
    })

    const res = await app.request('/')
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({
      code: 400,
      message: 'error!!!'
    })
  })

  it('404', async () => {
    const app = new Hono()
    app.use(honoThrow())
    app.get('/', (c) => {
      return c.json('Hello, Hono!')
    })

    const res = await app.request('/404')
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})
