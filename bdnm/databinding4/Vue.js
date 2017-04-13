// let Observer = require('./Observer')
// let compile = require('./compile')
function Vue(options) {
    var oberver = new Observer(options.data)
    var render = compile(options.el, oberver)
    render()
}