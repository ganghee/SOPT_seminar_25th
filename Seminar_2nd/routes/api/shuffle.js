const express = require('express');
const router = express.Router();

const csv = require('csvtojson');
const fs = require('fs');
const stringify = require('csv-stringify');

const memberFilePath = __dirname + '/../../public/csvs/member.csv'
const memberFilePath2 = __dirname + '/../../public/csvs/member2.csv'

const shuffle = (arr) => {
    let delta;
    for(let i = arr.length; i; i-=1) {
        delta = Math.floor(Math.random()*i);
        [arr[delta], arr[i-1]] = [arr[i-1], arr[delta]];
    }
    return arr;
}

router.get('/',async(req,res) => {
    try{
        const member = await csv().fromFile(memberFilePath);
        if(!member) {
            console.log(`member scv file is empty`);
            res.send(`member scv file is empty`);
        } else {
            let arr = member.map(n => n.groupIdx);
            arr = shuffle(arr);
            for(let i in member){
                member[i].groupIdx = arr[i];
            }
            member.sort(function(a,b){
                return a["groupIdx"]-b["groupIdx"];
            });
            stringify(member,{header: true, columns:['name','groupIdx']},(err, output) => {
                if(err) throw err;
                else {
                    fs.writeFileSync(memberFilePath2, output, (err) => {
                        if(err) throw err;
                    });
                }
            });
            res.send(member);
        }
    } catch {
        console.log(`err with csv: ${err}`);
        res.send(`err with csv: ${err}`);
    }
});

module.exports = router;
