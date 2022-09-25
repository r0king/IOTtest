// import {firebaseApp} from "./firebaseInit.js"
import express from "express";
import { ExpressPeerServer } from "peer";
import fetch from 'node-fetch';
import fs from 'fs'
import { createLogger, format, transports } from "winston";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
 
const logger = createLogger({
  levels: logLevels,
  transports: [
    new transports.Console(),
    new(transports.File)({filename: 'logF.log'})              
              ],
});
let xenergyData;
try {
  fetch('http://3.109.76.78:2222/xenergyData.json')    
      .then(res => res.json())
      .then(text => {
        xenergyData = text
        fs.writeFile('xenergyData.json', JSON.stringify(xenergyData), err => {
          if (err) {
            throw err
          }
          logger.debug('File is written successfully.')
        })
        
      })  
} catch (error) {
  logger.error(error)
  let rawdata = fs.readFileSync('xenergyData.json');
  xenergyData = JSON.parse(rawdata);
}


const app = express();


app.get("/iotres", (request, response) => {
    response.json(xenergyData)
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/iot", (request, response) => {
  response.sendFile(__dirname + "/views/iotdevice.html");
});

// listen for requests :)
const listener = app.listen("8000", () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// peerjs server
const peerServer = ExpressPeerServer(listener, {
  debug: true,
  path: '/myapp'
});

app.use('/peerjs', peerServer);
