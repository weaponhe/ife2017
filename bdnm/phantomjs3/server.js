const http = require('http')
const url = require('url')
const qs = require('querystring')
const crawl = require('./crawl')

http.createServer(function (req, res) {
    req.on('data', function () {

    })
    req.on('end', async function () {
        let queryMap = qs.parse(url.parse(req.url).query)
        let result = await crawl(queryMap.kw, queryMap.ua)
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        res.end(result)
    })
}).listen(8081, function () {
    console.log('server started at port 8081')
})

