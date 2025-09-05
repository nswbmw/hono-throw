## hono-throw

A Hono middleware making it easy to throw HTTPException.

### Install

```sh
$ npm i hono-throw --save
```

### Example

```js
import { Hono } from 'hono'
import { honoThrow } from 'hono-throw'
import { serve } from '@hono/node-server'

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
```

### Test(100% coverage rate)

```sh
$ npm test
```

### License

MIT
