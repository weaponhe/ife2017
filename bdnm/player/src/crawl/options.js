const options = {
    hostname: 'music.163.com',
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
        Referer: "http://music.163.com/"
        // Cookie: "appver=1.5.0.75771"
    }
};
module.exports = options