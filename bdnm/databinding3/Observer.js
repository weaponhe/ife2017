let Watcher = require('./Watcher'),
    Dep = require('./Dep')

function Observer(data) {
    this.data = data
    this._walk(data)
}

Observer.prototype._walk = function (obj, parentDep = null) {
    var keys = Object.keys(obj)
    keys.forEach(key => {
        defineReactive.call(this, obj, key, obj[key], parentDep)
    })

    function defineReactive(obj, key, val, parentDep) {
        var vm = this
        var dep = new Dep()
        if (typeof val === 'object') {
            vm._walk(val, dep)
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
                val = newVal
                dep.notify()
                parentDep && parentDep.notify()
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