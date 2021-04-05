const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

const emmitter = new EventEmitter()

emmitter.on('log', (message) => {
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if (err) throw err
    })
})

function log(message) {
    emmitter.emit('log', message)
}

module.exports = log