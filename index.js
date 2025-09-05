import { HTTPException } from 'hono/http-exception'

function honoThrowHTTPException (status, options) {
  if (typeof options === 'string') {
    throw new HTTPException(status, { message: options })
  } else {
    throw new HTTPException(status, options)
  }
}

async function honoThrowMiddleware (c, next) {
  c.throw = honoThrowHTTPException
  return next()
}

export function honoThrow (app) {
  if (app) {
    app.use(honoThrowMiddleware)
    return app
  }

  return honoThrowMiddleware
}
