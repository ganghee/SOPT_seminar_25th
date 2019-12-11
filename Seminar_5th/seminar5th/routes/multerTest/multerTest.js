const express = require('express');
const upload = require('../../config/multer')
const router = express.Router({mergeParams: true});

router.post('/single', upload.single('image'), (req, res) => {
    console.log("location",req.file.location); 
    // console.log(req.file);
    // console.log(req.body);
    res.send({
        file: req.file.location, 
        body: req.body 
    });
})
router.post('/array', upload.array('photos', 4), (req, res) => { 
    console.log(req.files);
    console.log(req.body);
    res.send({ file: req.files, body: req.body });
})
var cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]) 
router.post('/fields', cpUpload, (req, res) => {
    console.log(req.files); 
    console.log(req.body);
    res.send({ file: req.files, body: req.body });
})

module.exports = router;