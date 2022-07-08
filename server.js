// Will help us access .env files
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// Models or Schema
const Journal = require('./Models/Journal')

const server = express()
const port = process.env.PORT
const uri = process.env.MONGO_URI

// set up your middleware
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }))

// connection to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Failed to connect to MongoDB'))
db.once('open', () => {
  console.log('Connection to MongoDB established!')
})

// Routes

// Post
server.post('/add-journal', (req, res) => {
  const incomingData = req.body
  const newJournal = new Journal(incomingData)

  newJournal.save((err, result) => {
    if (err) {
      res.status(500).send({
        msg: 'Error in the server',
      })
    }

    res.status(200).send({
      msg: 'Journal was created',
      document: result,
    })
  })
});

server.get('/get-all-journals', (req, res) =>{
   Journal.find({}, (err, result) => {
    if(err) {
        res.status(500).send({
            msg: 'Error while finding the Journals'
        })
    }
    res.status(200).send({
        msg: 'Journals found',
        document: result
    })
   })
})

server.delete('/delete-journal', (req, res) =>{
    Journal.deleteOne({_id: req.body._id}, (err, results) =>{
        if(err) {
            res.status(500).send({
                msg: 'Error while deleting journal',
            })
        }
        res.status(200).send({
            msg: 'Journal deleted/',
            document: result,
        })
    })
})

// Index route
server.get('/', (req, res) => {
  res.status(200).send({
    msg: 'server is running',
  })
})

server.listen(port, () => {
  console.log(`Listening ${port}`)
})
