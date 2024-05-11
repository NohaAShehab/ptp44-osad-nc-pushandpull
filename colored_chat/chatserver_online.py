# display online users -->
# coloring chat -->

from simple_websocket_server import WebSocketServer, WebSocket
import json


def get_message_content(message):
    message = json.loads(message)
    return message


def prepare_message(message_obj, clients):
    online_users = list(map(lambda client:client.username, clients))
    print(online_users)
    message = {"online":online_users}
    username = message_obj['name']
    message['sender'] = username
    if 'login' in message_obj and message_obj['login']:
        message['content'] = f'{username} has been connected'
    elif 'body' in message_obj and message_obj['body']:
        message['content'] =  f"{username}: {message_obj['body']}"
    #
    data = json.dumps(message)
    return data


class ChatServer(WebSocket):
    clients = []

    @classmethod
    def send_message_to_all(cls, message):
        for client in cls.clients:
            client.send_message(message)

    def handle(self):  # this message is fired when I receive any message
        received_message = get_message_content(self.data)
        if 'login' in received_message:
            self.username = received_message['name']
        newmessage = prepare_message(received_message, self.__class__.clients)
        self.__class__.send_message_to_all(newmessage)

    def connected(self):
        print(f"New client connected-> {self}")
        self.__class__.clients.append(self)

    def handle_close(self):
        print(self.address, 'closed')
        message=  {"content": f'{self.username} has been disconnected'}
        self.__class__.clients.remove(self)
        online_users = list(map(lambda client: client.username, self.__class__.clients))
        message['online']= online_users
        message['logout']=True
        self.__class__.send_message_to_all(json.dumps(message))



if __name__ == '__main__':
    server = WebSocketServer('', 8000, ChatServer)
    print(server)
    server.serve_forever()
