var player = document.getElementById('player'),
    audio = player.querySelector('audio'),
    btnPlay = player.querySelector('.play'),
    progress = player.querySelector('.progress'),
    playedBar = player.querySelector('.played-bar'),
    btnVolume = player.querySelector('.volume'),
    btnMode = player.querySelector('.mode'),
    songName = player.querySelector('.name'),
    songImg = player.querySelector('.cover img'),
    artist = player.querySelector('.singer')

stateEvent.on('mutedChange', function () {
    var muted = '&#xe60d;',
        notMuted = '&#xe610;'
    if (audio.muted) {
        btnVolume.innerHTML = notMuted
        audio.muted = false
    } else {
        btnVolume.innerHTML = muted
        audio.muted = true
    }
})
stateEvent.on('playingChange', function (newVal) {
    var play = '&#xe614;', pause = '&#xe607;'
    var playIcon = btnPlay.querySelector('i')
    if (newVal) {
        audio.autoplay = true
        audio.play()
        playIcon.innerHTML = pause
    } else {
        audio.autoplay = false
        audio.pause()
        playIcon.innerHTML = play
    }
})
stateEvent.on('songChange', function (newVal) {
    var track = data[state.playlist].tracks[newVal]
    songImg.src = track.picUrl
    songName.innerText = track.name
    artist.innerText = track.artist
    audio.src = track.mp3Url
})
stateEvent.on('modeChange', function (newVal) {
    // '[random,singleRepeat,listRepeat]'
    var icons = ['&#xe612;', '&#xe608;', '&#xe60e;']
    btnMode.innerHTML = icons[newVal]
})

// player
audio.addEventListener('timeupdate', function () {
    var duration = audio.duration;
    if (duration > 0) {
        playedBar.style.width = ((audio.currentTime / duration) * 100) + "%";
    }
});
audio.addEventListener('ended', function () {
    switch (state.mode) {
        case 0:
            randomSong()
            break
        case 1:
            repeatSong()
            break
        case 2:
            nextSong()
    }
});
btnPlay.addEventListener('click', function () {
    state.playing = !state.playing
})
btnVolume.addEventListener('click', function () {
    state.muted = !state.muted
})
btnMode.addEventListener('click', function () {
    state.mode = state.mode + 1 >= 3 ? 0 : state.mode + 1
})
progress.addEventListener('click', function (event) {
    var ratio = event.offsetX / parseInt(document.defaultView.getComputedStyle(progress).width)
    var width = ratio * 100 + '%'
    playedBar.style.width = width
    audio.currentTime = audio.duration * ratio;
    state.playing = true
})

audio.addEventListener('error', function (event) {
    nextSong()
})

function nextSong() {
    state.song = state.song + 1 >= data[state.playlist].trackCount ? 0 : state.song + 1
}
function randomSong() {
    var trackCount = data[state.playlist].trackCount
    var newSong
    do {
        newSong = parseInt(Math.random() * trackCount)
    }
    while (newSong === state.song)
    console.log(newSong)
    state.song = newSong
}
function repeatSong() {
    audio.currentTime = 0
    audio.play()
}