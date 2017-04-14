const http = require('http')
const playlists = require('./../../data/playlists.json')
let options = require('./options')

function request(id) {
    options.path = `/api/playlist/detail?id=${id}&updateTime=-1`
    return new Promise(function (resolve, reject) {
        let result = {}
        let req = http.request(options, (res) => {
            let data = ''
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                let obj = JSON.parse(data)
                // console.log(obj)
                result.id = obj.result.id
                result.name = obj.result.name
                result.coverImgUrl = obj.result.coverImgUrl
                result.trackCount = obj.result.trackCount

                result.tracks = obj.result.tracks.map(track => {
                    return {
                        name: track.name,
                        mp3: track.mp3Url,
                        artists: track.artists[0].name,
                    }
                })
                resolve(result)
            });
        })
        req.on('error', (err) => {
            reject(err)
        })
        req.end()
    })
}

let datalist = null
async function crawl() {
    if (datalist)
        return datalist

    datalist = []
    await Promise.all(playlists.map(async id => {
        let playlist = await request(id)
        datalist.push(playlist)
    }))
    return datalist
}


module.exports = crawl