import { Hono } from 'hono'
import { honoThrow } from './index.js'
import { serve } from '@hono/node-server'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()
honoThrow(app) // or app.use(honoThrow())

app.get('/', (c) => {
  c.throw(400, 'error!!!')

  // Equivalent to:
  // c.throw(400, { message: 'error!!!' })

  // Equivalent to:
  // throw new HTTPException(400, { message: 'error!!!' })
})

serve(app)
