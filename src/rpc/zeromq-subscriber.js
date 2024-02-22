const zmq = require('zeromq')

const sock = zmq.socket('sub');
sock.connect('tcp://127.0.0.1:2333');
console.log('ZMQ Subscriber connected to port 2333')

sock.subscribe('test-topic');
sock.on('message', (topic, msg) => {
  console.log(`zmq published on ${topic.toString()}: ${msg?.toString()}`);
});
