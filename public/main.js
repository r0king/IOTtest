let Peer = window.Peer;

let messagesEl = document.querySelector(".messages");
let peerIdEl = document.querySelector("#connect-to-peer");
const notificatoins = document.getElementById("notifications")
const IMEIElm = document.getElementById("IMEI");
const latitudeElm = document.getElementById("latitude");
const longitudeElm = document.getElementById("longitude");
const avgVolElm = document.getElementById("avgVol");
const packVolElm = document.getElementById("packVol");
const currentElm = document.getElementById("current");
const batteryElm = document.getElementById("battery");

function removeStack (){
  notificatoins.removeChild(notificatoins.firstChild)
}

let logMessage = (message) => {
  let newMessage = document.createElement("div");
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

let renderVideo = (stream) => {
  videoEl.srcObject = stream;
};

// Register with the peer server
let peer = new Peer({
  host: "localhost",
  port: "8000",
  path: "/peerjs/myapp",
});
peer.on("open", (id) => {
  logMessage("My peer ID is: " + id);
});
peer.on("error", (error) => {
  console.error(error);
});

function diconnectPeer (){
  peer.destroy();
  notificatoins.insertAdjacentHTML('afterbegin',`<div class="card shadow-md bg-primary text-primary-content"><div class="card-body"><h2 class="card-title">Peer Disconnected &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</h2> <p>THe webRTC connection has been disabled</p></div></div>`)

}
// Initiate outgoing connection
let connectToPeer = () => {
  let peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId}...`);
  
  
  let conn = peer.connect(peerId);
  conn.on("data", (data) => {

    const tdata = data.tdata.split(',') 
    const IOTdata = {
      IMEI :tdata[0],            
      latitude:tdata[1],
      longitude:tdata[2],
      avgVol:tdata[17],
      packVol:tdata[18],
      current:tdata[19],
      battery:tdata[20]
    }
    IMEIElm.innerText = IOTdata.IMEI;
    latitudeElm.innerText = IOTdata.latitude;
    longitudeElm.innerText = IOTdata.longitude;
    avgVolElm.innerText = IOTdata.avgVol;
    packVolElm.innerText = IOTdata.packVol;
    currentElm.innerText = IOTdata.current;
    batteryElm.innerText = IOTdata.battery;

    if(IOTdata.battery < 20)      
        notificatoins.insertAdjacentHTML('beforeend',`<div class="card shadow-md bg-primary text-primary-content"><div class="card-body"><h2 class="card-title">Battery low &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</h2> <p>Battery low ${IOTdata.battery}</p></div></div>`)
        
      
    if(IOTdata.current < 0)
       notificatoins.insertAdjacentHTML('beforeend',`<div class="card shadow-md bg-primary text-primary-content"><div class="card-body"><h2 class="card-title">Discharging &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</h2> <p>current low ${IOTdata.current}</p></div></div>`) 
       
       if(IOTdata.current > 100)
       notificatoins.insertAdjacentHTML('beforeend',`<div class="card shadow-md bg-primary text-primary-content"><div class="card-body"><h2 class="card-title">Discharging &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</h2> <p>pack voltage> ${IOTdata.packVol}</p></div></div>`) 
        

    // const dbObj = {
    //   [data.vid]:[data]}
    // console.log(dbObj)
    // devRef.update({
    //   [data.vid]: db.FieldValue.arrayUnion(dbObj)
    // });
    
    // devRef.set({
    //   [data.vid]: data,
    // }, { merge: true })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
  });
  conn.on("open", () => {
    conn.send("hi!");
  });
};

window.connectToPeer = connectToPeer;
window.removeStack = removeStack;
window.diconnectPeer = diconnectPeer;