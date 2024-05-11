
console.log("welcome to chat app")

content_div = document.getElementById('content')
send_button = document.getElementById('send_button')
message_input = document.getElementById('message')
var username = prompt("Please enter your username: ")

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
    content_div.innerHTML += `<h3>${event.data}</h3>`
}