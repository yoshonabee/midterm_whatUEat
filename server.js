const express = require('express')
const mongoose = require('mongoose')

const Nutrition = require('./models/nutrition')

// Create server to serve index.html
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3001

// Socket.io serverSocket
const serverSocket = require('socket.io')(http)

// Start server listening process.

let buff = {}

http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

// Connect to mongo
mongoose.connect('mongodb+srv://yoshonabee:race34923@cluster0-f0xig.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})

db.once('open', () => {
    console.log('MongoDB connected!')
    serverSocket.on('connection', socket => {
        socket.on('recordInit', date => {
            console.log(date)

            Nutrition.find({date: date})
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err

                socket.emit('output', {date: date, items: res})
            })
        })

        socket.on('input', data => {
            let nutrition = new Nutrition(data)

            nutrition.save(err => {
                if (err) console.error(err)
                console.log(nutrition)
            })
        })

        socket.on('oneitem', id => {
            Nutrition.findById(id).exec((err, res) => {
                if (err) throw err

                socket.emit('oneitem', res)
            })
        })

        socket.on('delete', id => {
            Nutrition.findByIdAndDelete(id).exec((err, res) => {
                if (err) throw err

                console.log(`delete ${id}`)
                socket.emit('deleteDone')
            })
        })
    })
})
