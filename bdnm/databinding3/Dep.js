function Dep() {
    this.subs = []
    Dep.currentWatcher = null
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}
Dep.prototype.depend = function () {
    this.addSub(Dep.currentWatcher)
}
Dep.prototype.notify = function () {
    this.subs.forEach((sub) => {
        sub.update()
    })
}

module.exports = Dep