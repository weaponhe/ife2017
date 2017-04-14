var state = {
    _playlist: undefined,
    _playing: false
}
Object.defineProperty(state, 'playlist', {
    set: function (newVal) {
        if (state._playlist === undefined) {
            state._playlist = newVal
            state.playing = true
        } else if (state._playlist !== newVal) {
            state._playlist = newVal
            state.playing = true
        } else {
            state.playing = !state.playing
        }
    },
    get: function () {
        return state._playlist
    }
})
Object.defineProperty(state, 'playing', {
    set: function (newVal) {
        for (var i = 0, len = playlistSet.length; i < len; i++) {
            playlistSet[i].classList.remove('playing')
        }
        if (newVal) {
            document.getElementById(state.playlist).classList.add('playing')
        }
        state._playing = newVal
    },
    get: function () {
        return state._playing
    }
})

var playlists = document.getElementById('playlists')
var playlistSet = playlists.children
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
        state.playlist = target.id
    }
}, false)