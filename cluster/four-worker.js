// const {workerData ,parentPort} = require('worker_threads')

// let counter = 0;
// for(let i = 0; i<10000000000 / workerData.thread_count; i++){
//     counter ++
// }

// parentPort.postMessage(counter)




const {workerData, parentPort} = require('worker_threads')

let even;
for(let i = 0; i<=200000000/workerData.thread_count; i++){
    if(i%2==0){
        even += `${i.toString()}\n` 
    }
}

parentPort.postMessage(even)