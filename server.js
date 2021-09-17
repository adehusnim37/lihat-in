const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const redirect = require('./routes/api/redirect')

const shorten = require('./routes/api/shorten')
const path = require("path");
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// uri key mongo
const db = process.env.MONGODB_URI

mongoose.connect(db).then(()=> console.log('berhasil terhubung ke database')).catch( onerror=> console.log(onerror))

app.get('/',(req,res) => {
    res.send('halo dunia')
    console.log(dotenv.parsed)
})

app.get('/:hash', (req,res) => {
    const id = req.params.hash
    URL.findOne({
        _id: id
    }, (err,doc) => {
        if(doc){
            console.log(doc.url)
            res.redirect('https://' + doc.url)
        }else {
            res.redirect('/')
        }
    })
})

//routes
app.use('/api/shorten', shorten)
app.use('/api/redirect', redirect)



//productionmode

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('lihatinreact/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'lihatinreact', 'build', 'index.html')) // relative path
    })
}

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server berjalan di port ${port}`))
