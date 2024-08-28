const express = require('express')
const app = express()
const {Worker} = require('worker_threads')
const port = 5000
let counter = 0
app.get('/', (req, res) => {
    counter++
    res.status(200).json(counter)
})
app.get('/counter', (req, res) => {
    const worker = new Worker('./worker.js')
    worker.on('message', (data) => {
        console.log(data);
        res.json(data)
    })
    worker.on('error', (error) => {
        res.status(404).json("Worke error : ", error)
    })
})

app.listen(port, ()=>{
    console.log(`app is runnung port: http://localhost:${port}`);
})