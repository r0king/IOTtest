const response = await fetch('/iotres');
const body = await response.json();


// client-side js, loaded by index.html
// run by the browser each time the page is loaded
let Peer = window.Peer;

let messagesEl = document.querySelector('.messages');

let logMessage = (message) => {
  let newMessage = document.createElement('div');
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

// Register with the peer server
let peer = new Peer({
  host: 'localhost',
  port:'8000',
  path: '/peerjs/myapp'
});
peer.on('open', (id) => {
  logMessage('My peer ID is: ' + id);
});
peer.on('error', (error) => {
  console.error(error);
});

// Handle incoming data connection
peer.on('connection', (conn) => {
  logMessage('incoming peer connection!');
  conn.on('data', (data) => {
    logMessage(`received: ${data}`);
  });
  conn.on('open', async () => {    
    for(let i =0;i<body.records.length;i++){
      if (body.records[i] !== body.records[i+1] ) {
        await new Promise(r => setTimeout(() => r(), 500));
        conn.send(body.records[i])
      }
    }
  });
});



// Initiate outgoing connection
let connectToPeer = () => {
  let peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId}...`);

  let conn = peer.connect(peerId);
  conn.on('data', (data) => {
    logMessage(`received: ${data}`);
  });
  conn.on('open', () => {
    conn.send('hi!');
  });
};

window.connectToPeer = connectToPeer;