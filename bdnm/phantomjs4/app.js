let path = require('path'),
    Koa = require('koa'),
    router = require('koa-router')(),
    readFile = require('./lib/readFilePro'),
    crawl = require('./lib/crawl'),

    app, indexFile

app = new Koa()
app.use(async function (ctx, next) {
    console.log(`request to ${ctx.request.url}`)
    await next()
})

router.get('/', async(ctx, next) => {
    var response = ctx.response
    if (!indexFile) {
        indexFile = await readFile(path.resolve(__dirname, 'views', 'index.html'))
    }
    response.set({
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'max-age=1000'
    })
    response.body = indexFile
})

router.get('/search', async(ctx, next) => {
    let data = await crawl(ctx.request.query.keyword, ctx.request.query.userAgent)
    ctx.response.body = data
})

app.use(router.routes())

app.listen(8080, () => {
    console.log('the server started at port 8080')
})