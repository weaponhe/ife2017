function Watcher(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
}

Watcher.prototype.update = function () {
    this.cb.call(this.vm)
}

// module.exports = Watcher