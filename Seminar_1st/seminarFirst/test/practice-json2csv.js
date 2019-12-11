const json2csv = require('json2csv');
const fs = require('fs')

const jsonArray = [
    {
        id: 'admin',
        pw: 'admin',
        name: '관리자'
    },
    {
        id: 'heesung',
        pw: '1q2w3e4r!',
        name: '윤희성'
    },
    {
        id: 'starbucks',
        pw: 'JamongBlackHoneyTea',
        name: '스타벅스'
    }
];

const resultCsv = json2csv.parse(jsonArray)
jsonArray.forEach((num) => {
    const fileCommonName = 'json2csv';
    const fileName = fileCommonName+num;
    const data = `csv = '${resultCsv}'`;
    fs.writeFileSync(`${fileName}.txt`, data);
    console.log(`file[${fileName}] write complete`);
})
console.log(resultCsv)