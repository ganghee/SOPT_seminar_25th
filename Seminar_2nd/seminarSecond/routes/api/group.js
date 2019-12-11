const express = require('express');
const csv = require('csvtojson');
const router = express.Router();

const memberFilePath = __dirname + '/../../public/csvs/member.csv';
const groupFilePath = __dirname + '/../../public/csvs/group.csv';

router.get('/',async(req, res)=>{
    try {
        const member = await csv().fromFile(memberFilePath);
        const group = await csv().fromFile(groupFilePath);
        let seminarMember = []

        if(!member) console.log(`file read err: ${err}`);
        else {
            for(let i in member){
                for(let j in group){
                    if(member[i].groupIdx == group[j].groupIdx){
                        seminarMember.push({name: member[i].name, groupName: group[j].name});
                    }
                }
            }
            res.send(seminarMember);
        }
    } catch(err){
        console.log(`file read err : ${err}`);
    }
})

// find group member
router.get('/:groupIdx',async(req,res) => {
    try{
        const member = await csv().fromFile(memberFilePath);
        const group = await csv().fromFile(groupFilePath);

        if(!member || !group) console.log(`file read err: ${err}`);

        IDX = req.params.groupIdx;
        let groupName = group[String(Number(IDX - 1))].name;

        people = member.filter(it => it.groupIdx === IDX).map(it => it.name);

        res.send({groupName,people});
    } catch(err) {
        res.send(404);
        console.log(`err with csv: ${err}`);
    }
});

module.exports = router;
