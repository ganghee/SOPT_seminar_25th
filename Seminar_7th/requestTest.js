const request = require('request');

const url = 'https://sosopt.herokuapp.com/'
request.get({
    url: url,
    json: true
}, (err, httpResponse, body) => {
    if (err) {
    console.log(body);
    return;
}
console.log(body.message)
})