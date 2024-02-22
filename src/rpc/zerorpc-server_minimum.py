import zerorpc

class RPCServer():
    def add(self, a, b):
        return a + b

if __name__ == '__main__':
    server = zerorpc.Server(RPCServer())
    server.bind('tcp://127.0.0.1:4242')
    server.run()
