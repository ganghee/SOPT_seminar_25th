const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const csv = require('csvtojson');

const filePath = './public/csvs/';

const csvManager = {
    write: (fileName, jsonArray) => {
        return new Promise((resolve, reject) => {
            const resultCsv = json2csv.parse(jsonArray);
            fs.writeFile(path.join(filePath, fileName), resultCsv, (err) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    },
    read: (fileName) => {
        return new Promise((resolve, reject) => {
            csv().fromFile(path.join(filePath, fileName)).then((jsonArr) => {
                resolve(jsonArr);
            },(err) => {
                reject(err);
            })
        });
    },
}

module.exports = csvManager;