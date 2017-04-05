var page = require('webpage').create()
var system = require('system')
var UA = require('./ua')
if (system.args.length !== 3) {
    console.log('Usage: phantomjs task.js <keyword> <user agent>')
    phantom.exit()
}
var res = {
    code: 0,
    msg: '抓取失败',
    word: system.args[1]
}

page.settings.userAgent = UA[system.args[2]].userAgent || '';
if (page.settings.userAgent) {
    page.viewportSize = UA[system.args[2]].viewportSize
    res.userAgent = UA[system.args[2]].userAgent
}

page.onError = function (msg, trace) {
};

var t = Date.now();
page.open('http://www.baidu.com/s?wd=' + system.args[1], function (status) {
    if (status === 'success') {
        var data = page.evaluate(function () {
            var ret = []
            var res = document.getElementsByClassName('result')
            for (var i = 0, len = res.length; i < len; i++) {
                var item = res[i]
                var t = item.querySelector('h3.t a')
                var p = item.querySelector('div.c-abstract')
                var a = item.querySelector('a.c-showurl')
                var img = item.querySelector('img.c-img')
                ret.push({
                    title: t && t.innerText,
                    info: p && p.innerText,
                    link: a && a.href,
                    pic: img && img.src
                })
            }
            return ret
        })
        res.dataList = data
        res.code = 1
        res.msg = '抓取成功'
    }
    res.time = Date.now() - t
    console.log(JSON.stringify(res, null, '\t'))
    phantom.exit();
});


