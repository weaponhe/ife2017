var playlists = document.getElementById('playlists')

fetch('/api/playlists', function (err, res) {
    res = JSON.parse(res)
    var template = playlists.firstElementChild.cloneNode(true)
    playlists.removeChild(playlists.firstElementChild)
    for (var i = 0, len = res.length; i < len; i++) {
        var item = template.cloneNode(true),
            img = item.querySelector('img'),
            title = item.querySelector('h4'),
            count = item.querySelector('span')
        item.id = res[i].id
        img.src = res[i].coverImgUrl
        title.innerText = res[i].name
        count.innerText = res[i].trackCount
        playlists.appendChild(item)

        data[item.id] = res[i]
    }
    if (!state.playlist) {
        lazyLoadPlaylist(res[0].id, function (err, playlist) {
            state.playlist = playlist.id
            state.song = 0
        })
    }
})

stateEvent.on('playlistChange', function (newId, oldId) {
    if (oldId) {
        var oldItem = document.getElementById(oldId)
        oldItem.classList.remove('playing')
    }
    if (state.playing) {
        var newItem = document.getElementById(newId)
        newItem.classList.add('playing')
    }
})
stateEvent.on('playlistChange', function (newId, oldId) {
    if (oldId && newId && newId !== oldId) {
        lazyLoadPlaylist(newId, function (err, playlist) {
            state.song = 0
            var track = playlist.tracks[state.song]
            songImg.src = track.picUrl
            songName.innerText = track.name
            artist.innerText = track.artist
            audio.src = track.mp3Url
        })
    }
})


stateEvent.on('playingChange', function (newVal) {
    if (state.playlist) {
        var playingItem = document.getElementById(state.playlist)
        if (newVal) {
            playingItem.classList.add('playing')
        } else {
            playingItem.classList.remove('playing')
        }
    }
})

playlists.addEventListener('click', function (event) {
    target = event.target
    while (target) {
        if (target.classList && target.classList.contains('item')) {
            break
        }
        target = target.parentNode
    }
    if (target) {
        if (target.id === state.playlist) {
            state.playing = !state.playing
        } else {
            state.playing = true
            state.playlist = target.id
        }
    }
})


function lazyLoadPlaylist(id, cb) {
    if (data[id].tracks) {
        cb(null, data[id])
    }
    else {
        fetch('/api/playlists/' + id, function (err, playlist) {
            if (err)
                cb(err)
            playlist = JSON.parse(playlist)
            data[id] = playlist
            cb(null, data[id])
        })
    }
}