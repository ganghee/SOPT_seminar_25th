let moment = require('moment');
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

var yesterday = moment('2019-12-06','YYYY-MM-DD')
var timeAble = moment('07:45','hh:mm')
console.log(timeAble.hour(), timeAble.minute())

console.log(yesterday.format())
console.log(yesterday.format('YYYY-MM-DD'))
console.log(yesterday.format('YYYY'))
console.log(yesterday.format('MM'))
console.log(yesterday.format('DD'))
let currentDatetime = moment(moment().unix()*1000).format("YYYY-MM-DD HH:mm:ss")

console.log(`currentDatetime => ${currentDatetime}`)

var t1 = new Date(2019, 12, 22);
var t2 = new Date(2020, 1, 4);
var diff2 = {
seconds: moment.duration(t2 - t1).asSeconds(), // 1123200
minutes: moment.duration(t2 - t1).asMinutes(), // 18720
hours: moment.duration(t2 - t1).asHours() //312
};
console.log(diff2);