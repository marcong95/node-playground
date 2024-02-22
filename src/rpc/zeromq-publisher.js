const zmq = require('zeromq')

const sock = zmq.socket('pub')
sock.bindSync('tcp://127.0.0.1:2333')
console.log('ZMQ Publisher bound to port 2333')

setInterval(() => {
  const rnd = Math.floor(Math.random() * 10000);
  sock.send(['test-topic', ':) ' + rnd]);
  console.log(`Message published (${rnd}).`);
}, 1000);
