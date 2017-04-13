function compile(el, vm) {
    el = document.querySelector(el)
    var reg = /({{(.*)}})/g
    return function render() {
        var newEl = createElement(el)
        el.parentNode.replaceChild(newEl, el)
    }
    function createElement(el) {
        var newEl = el.cloneNode(false)
        var childNodes = [].slice.call(el.childNodes)
        childNodes.forEach(function (child) {
            if (child.nodeType === 1) {
                newEl.appendChild(createElement(child))
            } else if (child.nodeType === 3) {
                newEl.appendChild(createText(child))
            }
        })
        return newEl
    }

    function createText(el) {
        el.nodeValue = el.nodeValue.replace(reg, (match, p1, p2) => {
            return (new Function('data', `with(data){return (${p2})}`))(vm.data)
        })
        return el
    }
}

// module.exports = compile