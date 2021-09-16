const express = require('express')
const router = express.Router();

//@route GET /api/redirect/test
//@desc test api end point
//@access public
router.get('/test', (req,res) => {
    res.json({msg: 'api redirect working'})
})

//@route get api/redirect
//@header hash
//@description redirect link
router.post('/', (req,res) => {
    const hash = req.headers.hash;

    URL.findOne({_id: hash}).then((doc) => {
        return res.json({url: doc.url})
    }).catch((err) => {
        return res.status(400).json({ error: 'link has been expired'})
    })
})

module.exports = router
