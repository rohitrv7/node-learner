const cluster = require('node:cluster');
const os = require('os')
const express = require('express')


const numCPUs = os.cpus().length


if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else{
    const app = express()
    const port = 5000
    app.get('/', (req, res) => {
        res.send(`hello ${process.pid}`);
        console.log(`hello ${process.pid}`);
        
    })
    
    app.listen(port, ()=>{
        console.log(`app is runnung port: http://localhost:${port}`);
    })
}