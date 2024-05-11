
console.log("welcome to chat app")
apptitle = document.getElementById("apptitle");
content_div = document.getElementById('content')
send_button = document.getElementById('send_button')
message_input = document.getElementById('message')
var username = prompt("Please enter your username: ")
apptitle.innerHTML = `Chat App ${username}`

// console.log(message_input, send_button, content_div)
console.log(username)

/// use websockets to open connection --> with me and the remote server
// connection use ws (web socket server )

// once I opened the client --> connect to the server --> websocket
mywebsocket = new WebSocket('ws://localhost:800');// instance connect to the server


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

    content_div.innerHTML += `<h3>${message_content.content}</h3>`
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