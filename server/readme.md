
# The WebSocket API (WebSockets)

The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

Historically, creating web applications that need bidirectional communication between a client and a server (e.g., instant messaging and gaming applications) has required an abuse of HTTP to poll the server for updates while sending upstream notifications as distinct HTTP calls.

# This results in a variety of problems:

- The server is forced to use a number of different underlying TCP connections for each client: one for sending information to the client and a new one for each incoming message.
- The wire protocol has a high overhead, with each client-to-server message having an HTTP header.
- The client-side script is forced to maintain a mapping from the outgoing connections to the incoming connection to track replies.
A simpler solution would be to use a single TCP connection for traffic in both directions. This is what the WebSocket Protocol provides. Combined with the WebSocket API [WSAPI], it provides an alternative to HTTP polling for two-way communication from a web page to a remote server.


# Applications:

The same technique can be used for a variety of web applications:

- games
- stock tickers
- multiuser applications with simultaneous
- editing, user interfaces exposing server-side services in real time, etc.

# OSI Layer:

The Open Systems Interconnection model (OSI model) is a conceptual model that characterises and standardises the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology. Its goal is the interoperability of diverse communication systems with standard communication protocols.

In the OSI reference model, the communications between a computing system are split into seven different abstraction layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.
![osi-model-7-layers-1](https://user-images.githubusercontent.com/80479635/159053911-4abfd605-7523-44bf-8c32-7780a7c14e4d.png)

# TCP:

The folloiwng image is a representation of how TCP connections are handled

![what-is-a-tcp-3-way-handshake-process-three-way-handshaking-establishing-connection-6a724e77ba96e241](https://user-images.githubusercontent.com/80479635/159053968-155b6424-54ef-44fa-8866-0a7d182526d2.jpg)

# HTTP Vs WebSockets:

Comparison of how HTTP and WebSockets are handled
![1_jTmCp3L3eVEG4fokeuqQZQ](https://user-images.githubusercontent.com/80479635/159054008-ac128d6f-d664-45f3-98ff-b1fc6795024d.png)

# Websockets URL
```js
ws-URI = "ws:" "//" host [ ":" port ] path [ "?" query ]
wss-URI = "wss:" "//" host [ ":" port ] path [ "?" query ]
```
WebSocket is a naturally full-duplex, bidirectional, single-socket connection. With WebSocket, your HTTP request becomes a single request to open a WebSocket connection and reuses the same connection from the client to the server, and the server to the client.

WebSocket reduces latency. For example, unlike polling, WebSocket makes a single request. The server does not need to wait for a request from the client. Similarly, the client can send messages to the server at any time. This single request greatly reduces latency over polling, which sends a request at intervals, regardless of whether messages are available.


# Socket IO

# Introduction:

Although ws is a light weight implementation, we want to use a library that provides a lot of inbuilt functionality Socket.io is a library that provides this functionality for us, which is Performant, Reliable and Scalable

- In case the WebSocket connection is not possible, it will fall back to HTTP long-polling. And if the connection is lost, the client will automatically try to reconnect.
- In most cases, the connection will be established with WebSocket, providing a low-overhead communication channel between the server and the client.
- Scale to multiple servers and send events to all connected clients with ease.
Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.

![bidirectional-communication2](https://user-images.githubusercontent.com/80479635/159054096-38e28e3e-5a71-4efb-b7b3-b2dabef3c0e5.png)

It is built on top of the WebSocket protocol and provides additional guarantees like fallback to HTTP long-polling or automatic reconnection.

# Example

Server
```js
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});
```
Frontend

```js
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});
```

# What socket.io is not

Socket.IO is NOT a WebSocket implementation.

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.

```js
// WARNING: the client will NOT be able to connect!
const socket = io("ws://echo.websocket.org");
```
# Features:

- HTTP long-polling fallback
- Automatic reconnection
- Packet buffering
- Acknowledgements
- Broadcasting
- Multiplexing

# Server Installation
```js
npm install socket.io
```

# Setup

We can setup socket io in the following manner

```js
const { Server } = require("socket.io");

const io = new Server({
  /* options */
});
// or
const io = new Server(3000, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
});

io.listen(3000);
```

# With express
if you want to setit up with express you can also do it in this way.
```js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
});

httpServer.listen(3000);
```
Now when a client connects to a server, it will print the socket id

# Server Client
The following image shows how the server talks to the client in a bi directional way
![bidirectional-communication-socket](https://user-images.githubusercontent.com/80479635/159054223-8267994d-23dc-46d3-b43e-d1ea5a014b20.png)

# installing on the client

- so once we have the server setup, we can install socket io on the client

```js
<script
  src="https://cdn.socket.io/4.4.1/socket.io.min.js"
  integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H"
  crossorigin="anonymous"
></script>
<script>
  const socket = io("ws://localhost:8080");
  socket.on("connect", () => {
    console.log(socket.id);
  });
</script>
```

# notes

- its important to understand, that if you try to use the native WebSocket from client, it will not work for you
- because Socket.IO is NOT a WebSocket implementation.
- so you will have use socket.io on the client side as well like the previous example
- once you connect you will find the id of the client, you will be able to see the server also print this id on the backend
- you may need to allow cors on the system to get it to work correctly
- please see this link to setup cors (https://socket.io/docs/v4/handling-cors/)
- you can use a plugin to enable cors temporarily

```js
io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
});
```

# Lets update our server app
so lets make our server better

- lets create our server with new io.Server(8080) lets call it socketServer
- we will maintain a count of connections as well connected to the server
- so lets declare a variable as 0
- now lets create an event listener for when a connection is established
```js
socketServer.on("connection",socket=>{ ... })
```
- the socket that you define in the arrow function is the client instance
- you can check by the id of the instance
- now everytime a new connection is established, we can send out a notification to other users
- now the good part of working with socket.io is that we can create our own event names, which was much harder to do with native socket
- so we can just create an emitter, which emits a message from the server to the client or vise versa
- so on the server lets add the following code

```js
 // inside the socketServer.on callback
    socket => {
    ...
    / * emit a ntoification to all users except the client */
    socket.broadcast.emit("notification",{
        id: socket.id,
        message: "a new user has joined"
    })
    ...
    }
```
- you can also write socket.emit, but the difference is that when you do socket.emit it will send to all clients that are connected
- to send to all users except the user, you need to use the socket.broadcast.emit method
- now you can listen to this event from the frontend by having a listener

# To all connected clients

![broadcasting](https://user-images.githubusercontent.com/80479635/159054369-f1315396-f4ca-4fc4-9ae9-37451368369b.png)

```js
io.emit("hello", "world");
```
# To all connected clients except the sender

![broadcasting2](https://user-images.githubusercontent.com/80479635/159054492-e2490c8b-3d58-4d8d-aaff-3b7eee100bc9.png)

```js
io.on("connection", (socket) => {
  socket.broadcast.emit("hello", "world");
});
```
- we can manage notification on frontend
```js
socket.on("notification", (payload) => {
  try {
    console.log(payload);
    if (payload.type === "user_message") receiveMessage(payload);
  } catch (err) {
    console.log(err);
  }
});
```
```js
const io = require("socket.io");
// * create a socket server
const socketServer = new io.Server(8080);

let count = 0;

// * when a client connects
socketServer.on("connection", (socket) => {
  // * emit a ntoification to all users
  socket.broadcast.emit("notification", {
    id: socket.id,
    message: "a new user has joined",
  });

  console.log(`total connections`, ++count);

  // * if an event called message is received, handle in this manner
  socket.on("message", (data) => {
    socketServer.emit("notification", {
      ...data,
      type: "user_message",
      timestamp: new Date().toUTCString(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`total connections`, --count);
  });
});
```
