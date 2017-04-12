let Watcher = require('./Watcher'),
    Dep = require('./Dep')

function Observer(data) {
    this.data = data
    this._walk(data)
}

Observer.prototype._walk = function (obj) {
    var keys = Object.keys(obj)
    keys.forEach(key => {
        defineReactive.call(this, obj, key, obj[key])
    })

    function defineReactive(obj, key, val) {
        var vm = this
        var dep = new Dep()
        if (typeof val === 'object') {
            vm._walk(val)
        }
        Object.defineProperty(obj, key, {
            get: function () {
                if (Dep.currentWatcher) {
                    dep.depend()
                }
                return val
            },
            set: function (newVal) {
                if (typeof newVal === 'object') {
                    vm._walk(newVal)
                }
                dep.notify()
                val = newVal
            }
        })
    }
}


Observer.prototype.$watch = function (exp, cb) {
    vm = this
    var sub = new Watcher(this, exp, cb)
    Dep.currentWatcher = sub
    vm.data[exp]
    Dep.currentWatcher = null
}


module.exports = Observer