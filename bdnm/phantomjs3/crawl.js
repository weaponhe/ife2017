const exec = require('child_process').exec;
module.exports = crawl

async function crawl(kw, ua) {
    kw = kw || ''
    ua = ua || ''
    return new Promise(function (resolve, reject) {
        exec('phantomjs task.js ' + kw + ' ' + ua, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            }
            resolve(stdout)
        });
    })
}