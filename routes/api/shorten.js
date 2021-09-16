const express = require('express')
const router = express.Router()
const {nanoid} = require('nanoid')
const URL = require('../../models/schemadb')

router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// @route get /api/shorten/test
router.get('/test', (req,res) => {
    res.json({msg: 'Api telah Bekerja'})
})

// @route post api/shorten
// @desc post url yang telah dibuat
router.post('/', (req,res) => {
    console.log(req.body)
    let urlData;
    if (req.body.url) {
        urlData = req.body.url
    }
    console.log('Url anda adalah : ', urlData)
    //check url telah ada
    URL.findOne({url: urlData}, (err,doc) =>{
        if(doc) {
            console.log('telah ditemukan di database')
        } else {
            console.log('This is new url')
            const webaddress = new URL({
                _id: nanoid(3),
                url: urlData,
            });
            webaddress.save((err) => {
                if (err) {
                    return console.log(err)
                }
                res.send({
                    url: urlData,
                    hash: webaddress._id,
                    status: 200,
                    statusTxt: 'OK'
                })
            })
        }
    });
})

module.exports=  router
