
console.log("welcome to chat app")
apptitle = document.getElementById("apptitle");
content_div = document.getElementById('content')
send_button = document.getElementById('send_button')
message_input = document.getElementById('message')
var onlineusers = document.getElementById('onlineusers')
var username = prompt("Please enter your username: ")
apptitle.innerHTML = `Chat App ${username}`

// console.log(message_input, send_button, content_div)
console.log(username)

/// use websockets to open connection --> with me and the remote server
// connection use ws (web socket server )

// once I opened the client --> connect to the server --> websocket
mywebsocket = new WebSocket('ws://localhost:8000');// instance connect to the server


// mywebsocket --> set of methods .// events -->

// send my name to the server once the server opened
mywebsocket.onopen = function () {
    // send message to the server
    data = {
        name: username,
        login : true
    }
    data = JSON.stringify(data)
    this.send(data)

}


// what I will do when I receive message ?
mywebsocket.onmessage = function (event) {
    // console.log('message received', event.data )
    message_content = JSON.parse(event.data)
    console.log(message_content)
    if (message_content.logout){
        content_div.innerHTML += `<div><h3 style="color: red" class="rounded">${message_content.content}</h3>  </div>`
    }else if (message_content.sender == username) {
        content_div.innerHTML += `<div style="direction: rtl;"><h4 class="d-inline-block w-auto rounded" style=" background: antiquewhite;">${message_content.content}</h4> </div>`
    }else{
        content_div.innerHTML += `<div> <h4 class="d-inline-block w-auto rounded" style="background: aquamarine;">${message_content.content}</h4> </div>`
    }

    online_users = message_content.online
    onlineusers.innerHTML = ''
    online_users.forEach((user)=>{
       onlineusers.innerHTML += `<li>${user}</li>`
    });
}

// allow client to send message ??
send_button.addEventListener('click', function (event) {
    usermessage =message_input.value
    data = {
        name: username,
        body:usermessage
    }
    mywebsocket.send(JSON.stringify(data))
    message_input.value=''
})


mywebsocket.onerror= function (event) {
    content_div.innerHTML += `<h2 style="color:red;">Error connecting to server</h2>`
}