
const socket = io()
const clientsTotal = document.querySelector('#client-total')
const messageContainer = document.querySelector('#message-container')
const nameInput = document.querySelector('#name-input')
const messageForm = document.querySelector('#message-form')
const messageInput = document.querySelector('#message-input')

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    sendMessage()
})

socket.on('clients-total', (data)=>{
    clientsTotal.innerHTML = `Total clients : ${data}`
})

function sendMessage(){
    // console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessage(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) =>{
    addMessage(false, data)
})


function addMessage(isOwnMessage, data){
    const element = `
        <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
        <p class="name">${data.name}<p>
        <p class="message">
          ${data.message}
          <span>${moment(data.dateTime).fromNow()}</span>
        </p>
        </li>`

        messageContainer.innerHTML += element
        scrolToBottom()
}

function scrolToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback', {
        feedback:`${nameInput} is typing....`
    })
})
messageInput.addEventListener('keypress',()=>{
    socket.emit('feedback', {
        feedback:`${nameInput} is typing....`
    })
})
messageInput.addEventListener('blur',()=>{
    socket.emit('feedback', {
        feedback:'',
    })
})

socket.on('feedback',(data)=>{
    // clearFeedback()
    const element = `<li class="message-feedback">
          <p class="feedback" id="feedback">✍️ ${data.feedback}</p>
        </li>`
        messageContainer.innerHTML += element
})

// function clearFeedback(){
//     document.querySelector('.message-feedback').forEach(element => {
//         element.parentNode.removeChild(element)
//     });
// }