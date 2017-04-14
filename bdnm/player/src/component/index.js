const fs = require('fs')
const path = require('path')
let COMPONENT_ROOT_PATH = path.resolve(process.cwd(), 'views')
let component = {
    player: null,
    playlist: null
}
for (name in component) {
    component[name] = loadComponent(name)
}
function loadFile(path) {
    return fs.readFileSync(path, 'utf8')
}
function loadComponent(name) {
    let component = {}
    component.html = loadFile(path.resolve(COMPONENT_ROOT_PATH, name, 'index.html'))
    component.css = loadFile(path.resolve(COMPONENT_ROOT_PATH, name, 'style.css'))
    component.script = loadFile(path.resolve(COMPONENT_ROOT_PATH, name, 'script.js'))
    return component
}

module.exports = component
