const express = require('express');
const router = express.Router();
const groupMixer = require('../../module/groupMixer');
const csvManager = require('../../module/csvManager');

router.get('/',async(req,res) => {
    
    const member = await csvManager.read('member.csv');
    const arr = groupMixer.mix(member);
    arr.sort(function(a,b){
        return a["groupIdx"]-b["groupIdx"];
    });
    await csvManager.write('member1.csv',arr).catch(e => {
        console.log(`err with csv: ${e}`);
        res.send(`err with csv: ${e}`);
    });
    res.status(200).send(member);
});

module.exports = router;
