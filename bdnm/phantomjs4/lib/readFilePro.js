let fs = require('fs')
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}

module.exports = readFile