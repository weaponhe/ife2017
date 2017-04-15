const fs = require('fs')
let router = require('koa-router')()
let component = require('../component')
let crawl = require('../crawl')

let indexPage = fs.readFileSync(process.cwd() + '/views/index.html', 'utf-8')

router.get('/', async(ctx, next) => {
    ctx.response.set('Content-Type', 'text/html')
    ctx.response.body = indexPage
});

//component
router.get('/playlists', async(ctx, next) => {
    ctx.response.set('Content-Type', 'application/json')
    ctx.response.body = component.playlist
});

router.get('/player', async(ctx, next) => {
    ctx.response.set('Content-Type', 'application/json')
    ctx.response.body = component.player
});

//api
let cache = {}
router.get('/api/playlists', async(ctx, next) => {
    ctx.response.set('Content-Type', 'application/json')
    if (cache['/api/playlists']) {
        ctx.response.body = cache['/api/playlists']
        return
    }
    let {datalist} = await crawl()
    cache['/api/playlists'] = datalist.map(item => {
        let {id, name, coverImgUrl, trackCount} = item
        return {id, name, coverImgUrl, trackCount}
    })
    ctx.response.body = cache['/api/playlists']
});

router.get('/api/playlists/:id', async(ctx, next) => {
    let {datamap} = await crawl()
    ctx.response.set('Content-Type', 'application/json')
    ctx.response.body = datamap[ctx.params.id]
});

module.exports = router
