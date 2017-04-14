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
router.get('/api/playlists', async(ctx, next) => {
    var playlists = await crawl()
    ctx.response.set('Content-Type', 'application/json')
    ctx.response.body = playlists.map(playlist => {
        let {id, name, coverImgUrl, trackCount} = playlist
        return {id, name, coverImgUrl, trackCount}
    })
});

module.exports = router
