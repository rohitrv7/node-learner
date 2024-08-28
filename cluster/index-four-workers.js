const fs = require('node:fs');
const express = require('express')
const app = express()
const os = require('os')
const { Worker, workerData } = require('worker_threads')
const port = 3000
let counter = 0
const thread_count = os.cpus().length
// const thread_count = 2

app.get('/', (req, res) => {
    counter++
    res.status(200).json(counter)
})

function createWorker() {
    return new Promise((resolve, rejects) => {
        const worker = new Worker('./four-worker.js', {
            workerData: { thread_count: thread_count }
        })
        worker.on('message', (data) => {
            console.log(data);
            try {
                fs.writeFileSync('./even/even.txt', data);
            } catch (err) {
                console.error(err);
            }
            resolve(data)
        })
        worker.on('error', (error) => {
            rejects("Worke error : ", error)
        })
    })
}

app.get('/counter', async(req, res) => {
    const workerPromise = []
    for(let i=0; i< thread_count; i++){
        workerPromise.push(createWorker())
    }
    const thread_result = await Promise.all(workerPromise);

    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3]
    console.log(thread_result);

    res.status(200).json(total)
})

app.get('/even', async (req, res) => {
    // const worker = new Worker('./four-worker.js', {
        // workerData: {thread_count: thread_count}
    // })
    const worker = new Worker('./four-worker.js')
    worker.on('message', (data) => {
        try {
            fs.writeFileSync('./even/even.txt', data);
        } catch (err) {
            console.error(err);
        }
        res.json({data: data})
    })
    worker.on('error', (error) => {
        res.json("Worke error : ", error)
    })
})




app.listen(port, () => {
    console.log(`index-four-workers is runnung port: http://localhost:${port}`);
})