//@ts-nocheck

let ws;

function startWebSocket(url) {
  // Connect to the WebSocket endpoint (change the URL to your endpoint)
  ws = new WebSocket(url || "ws://localhost:8000/ws");

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
    const test = { message: "New message" };
    ws.send(JSON.stringify(test));
  }
}

function closeWebSocket() {
  if (ws) {
    ws.close();
  }
}

//startWebSocket();

window._test_ = {
  startWebSocket,
  sendMessage,
  closeWebSocket,
};
