from simple_websocket_server import WebSocketServer, WebSocket
import json


def get_message_content(message):
    message = json.loads(message)
    return message


class ChatServer(WebSocket):
    clients = []

    def handle(self):  # this message is fired when I receive any message
        # print(f"--> message received: {self.data}, {type(self.data)}")
        # when I receive any message --> I need to read its connect
        received_message = get_message_content(self.data)
        print(received_message)
        # send it to all users
        for client in self.__class__.clients:
            client.send_message(f"{received_message['name']} has been connected".capitalize())

    def connected(self):
        # this function will be called when client connected
        print(f"New client connected-> {self}")
        # add connected client to the clients
        self.__class__.clients.append(self)

    def handle_close(self):
        print(self.address, 'closed')
        # remove the client from the list
        self.__class__.clients.remove(self)


if __name__ == '__main__':
    server = WebSocketServer('', 8000, ChatServer)
    print(server)
    server.serve_forever()
