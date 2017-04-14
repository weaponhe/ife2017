let http = require('http')
let Koa = require('koa')
let router = require('./src/router/index')

let app = new Koa()
app.use(async(ctx, next) => {
    console.log(`request to ${ctx.request.url}`)
    await next()
})

app.use(router.routes())
app.listen(8080, function () {
    console.log('8080')
})


