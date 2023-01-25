console.log("on");

const socket = io();

const chatBox = document.getElementById('chatBox');

let user

socket.on("server-message", (data) => {
  console.log(data);
});

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa el usuario para identificarte",
  inputValidator: value => {
    return !value && "Necesitas escribir nombre de usuario"
  }
}).then(result => {
    user = result.value
})

chatBox.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatBox.value})
        }
    }
})

socket.on('messageLogs', data => {
    const log = document.getElementById('messageLogs')
    let messages = '';
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}<br>`
    });
    log.innerHTML = messages;
})
