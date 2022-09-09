import { v4 as uuid } from 'uuid';

class PendingRequest {
  constructor(requestId, payload, timeout = 0) {
    this.requestId = requestId;
    this.payload = payload;
    this.createdAt = Date.now();
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      if (timeout != null && timeout > 0) {
        setTimeout(() => {
          const error = new Error('Request timeout');
          Object.assign(error, {
            requestId,
            payload,
            createdAt: this.createdAt
          });
          reject(error);
        }, timeout);
      }
    });
  }
}

class WebSocketHelper {
  constructor(url) {
    this.pool = new Map();
    this.client = new WebSocket(url);
    this.client.onopen = this.onOpen.bind(this);
    this.client.onmessage = this.onMessage.bind(this);
    this.client.onclose = this.onClose.bind(this);
  }

  send(payload) {
    const requestId = uuid();
    const pendingRequest = new PendingRequest(requestId, payload, 5000);
    this.pool.set(requestId, pendingRequest);
    this.client.send(JSON.stringify({
      requestId,
      payload
    }));
    return pendingRequest;
  }

  onOpen(e) {
    console.log('WebSocket opened');
  }

  onMessage(e) {
    console.log('WebSocket onmessage');
    // console.log('WebSocket message received：', e);
    console.log('WebSocket data received：', e.data);
    const { requestId } = e.data;
    const request = this.pool.get(requestId);
    if (request == null) {
      console.warn(`No pending request for ${requestId} found.`);
    } else {
      request.resolve(e.data);
    }
  }

  onClose(e) {
    console.log('WebSocket onclose');
  }
}

(async function() {
  const client = new WebSocketHelper('ws://example.com');
  const result = await client.send('something');
  console.log('do something with', result);
})();
