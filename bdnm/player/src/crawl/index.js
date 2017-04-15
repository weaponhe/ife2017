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
                result.id = obj.result.id
                result.name = obj.result.name
                result.coverImgUrl = obj.result.coverImgUrl
                result.trackCount = obj.result.trackCount

                result.tracks = obj.result.tracks.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        mp3Url: track.mp3Url,
                        picUrl: track.album.picUrl,
                        artist: track.artists[0].name,
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

let datalist = [], datamap = {}
async function crawl() {
    if (datalist.length) {
        return {datalist, datamap}
    }
    await Promise.all(playlists.map(async id => {
        let playlist = await request(id)
        datalist.push(playlist)
        datamap[playlist.id] = playlist
    }))
    return {datalist, datamap}
}


module.exports = crawl