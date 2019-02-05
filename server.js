const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

// With express
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const auth = require('http-auth')
const basic = auth.basic({
  file: __dirname + '/.htpasswd',
})

app.prepare().then(() => {
  const server = express().use(
    favicon(path.join(__dirname, 'static', 'favicon.ico'))
  )

  if (process.env.NODE_ENV === 'production') {
    server.use(auth.connect(basic))
  }

  server.use(handler).listen(3000)
})
