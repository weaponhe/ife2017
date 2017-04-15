(function () {
    function EventEmitter() {
        this.map = {}
    }

    EventEmitter.prototype.on = function (type, handler) {
        if (this.map[type] === undefined) {
            this.map[type] = []
        }
        this.map[type].push(handler)
        return this
    }

    EventEmitter.prototype.off = function (type, handler) {
        if (this.map[type] === undefined)return false
        for (var i = 0; i < this.map[type].length; i++) {
            if (this.map[type][i] === handler) {
                this.map[type].splice(i, 1)
                return true
            }
        }
        return false
    }

    EventEmitter.prototype.emit = function (type, handler) {
        if (this.map[type] === undefined || this.map[type].length === 0)return false
        for (var i = 0; i < this.map[type].length; i++) {
            this.map[type][i].apply(null, Array.prototype.slice.call(arguments, 2))
        }
        return true
    }

    var moduleName = EventEmitter
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return moduleName
        })
    } else {
        this[moduleName.name] = moduleName
    }
}).call(function () {
    return this || (typeof window !== 'undefined' ? window : global)
}())