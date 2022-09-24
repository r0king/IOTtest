// client-side js, loaded by index.html
// run by the browser each time the page is loaded

let Peer = window.Peer;

let messagesEl = document.querySelector('.messages');
let peerIdEl = document.querySelector('#connect-to-peer');

let logMessage = (message) => {
  let newMessage = document.createElement('div');
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

let renderVideo = (stream) => {
  videoEl.srcObject = stream;
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

// Initiate outgoing connection
let connectToPeer = () => {
  let peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId}...`);

  let conn = peer.connect(peerId);
  conn.on('data', (data) => {
    console.log(data);
  });
  conn.on('open', () => {
    conn.send('hi!');
  });

};

window.connectToPeer = connectToPeer;

// // Handle incoming data connection
// peer.on('connection', (conn) => {
//   logMessage('incoming peer connection!');
//   conn.on('data', (data) => {
//     console.log(data);
//   });
//   conn.on('open', () => {
//     conn.send('hello!');
//   });
// });

// // Handle incoming voice/video connection
// peer.on('call', (call) => {
//   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then((stream) => {
//       call.answer(stream); // Answer the call with an A/V stream.
//       call.on('stream', renderVideo);
//     })
//     .catch((err) => {
//       console.error('Failed to get local stream', err);
//     });
// });