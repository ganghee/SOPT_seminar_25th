const cron = require('node-cron');
const moment = require('moment');
// cron.schedule('*/1 * * * * *', () => console.log('매 1초마다 실행', moment().format()));
// cron.schedule('0-30/1 * * * * *', () => console.log('0~30사이에 매 1초마다 실행', moment().format()));
// cron.schedule('25 * * * * *', () => console.log('25초에 실행', moment().format()));
// cron.schedule('26,27,28 * * * * *', () => console.log('26 또는 27 또는 28초에 실행', moment().format()));
// cron.schedule('0 12 * * *', () => console.log('매일 12시에 실행', moment().format()));
// cron.schedule('0 12 * Jan *', () => console.log('매주 일요일 12시에 실행', moment().format()));

const jobList = [];
module.exports = {
    addTask: (syntax, task, immediate = false) => {
        const job = cron.schedule(syntax, task, {scheduled: immediate});
        const idx = jobList.push(job) - 1;
        return idx;
    },
    startTask: (idx) => jobList[idx].start(),
    stopTask: (idx) => jobList[idx].stop(),
    destroy: (idx) => jobList[idx].destroy(),
    validate: (idx, syntax) => jobList[idx].validate(syntax),
    clear: () => {
            jobList.forEach(it => it.destroy());
            jobList.length = 0;
        }
}