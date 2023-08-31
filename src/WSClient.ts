let ws;

function startWebSocket() {
  // Connect to the WebSocket endpoint (change the URL to your endpoint)
  ws = new WebSocket("ws://localhost:8000/ws");

  ws.onopen = event => {
    console.log("WebSocket is open now.");
  };

  ws.onmessage = event => {
    console.log("WebSocket message received:", event.data);
  };

  ws.onerror = event => {
    console.error("WebSocket error observed:", event);
  };

  ws.onclose = event => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
      console.log("Connection died");
    }
  };
}

function sendMessage() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send('{"message": "Hello from the client!"}');
  }
}

function closeWebSocket() {
  if (ws) {
    ws.close();
  }
}

startWebSocket();

const test = {
  startWebSocket,
  sendMessage,
  closeWebSocket,
};

window.test = test;
