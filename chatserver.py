
from simple_websocket_server import WebSocketServer, WebSocket


class ChatServer(WebSocket):
    def handle(self):
        print("--> frame received")
        pass


    def connected(self):
        print("WebSocket connected")


    def handle_close(self):
        print(self.address, 'closed')


if __name__ == '__main__':
    server = WebSocketServer('', 8000, ChatServer)
    print(server)
    server.serve_forever()
