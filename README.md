
## Problem statement
We at Sheru collect data from hundreds of IoT devices everyday.The type of data collected and its source differ from device to device. An example is a GPS enabled device connected to a battery which reports battery location data, battery percentage and voltages etc. Here is the link of such an IoT device called Xenergy : http://3.109.76.78:2222/ xenergyData.json which collects data from the battery every second and it creates a packet along with the GPS data and sends the data through a TCP socket to the server.

## Getting Started
This project uses a webRTC data stream to create a datastream from iot device which fetches json data and sends it in regular interval to the server. The server then analyzes the data and displayes data in the main page also alerts the user in care of occurence. It also alowes user to connect to mulitple devices and also disconnect the server using UI. 

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/r0king/IOTtest.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the code
    ```
    npm start
    ```

## Routes

- '/' Has the main website in order to connect to an iot device you have to create an mock device from '/iot'
- '/iot' creates a mock device that has id which entered in main page connects and crates a data stream 
- '/iotres' has the json data for the iot device scaped abnd cached from http://3.109.76.78:2222/xenergyData.json
- '/peerjs' has the webRTC peerjs server running 

## Roadmap

- [x] Create a server which accepts socket connections from clients and which parses the
data
- [x] Scrape the data from the given url, then emulate an IoT device by establishing a socket
- [x] connection with the server and sending it the data packet and then closing the socket connection.
- [x] Both the server and client processes (emulated IoT device) should be fault tolerant,
save any errors to a log and restart incase of any fault.
- [x] After parsing the data at the server, save this data along with the time when this data
was received
- [x] Create real time alerts for this IoT device and battery
    - [x] In case the battery goes below 20 %
    - [x] Battery starts discharging (the value of current becomes negative) 
    - [x] If the battery pack voltage shoots across 100 mV 
- [ ] disconnect device
- [ ] upgrade to cloud database


<p align="right">(<a href="#readme-top">back to top</a>)</p>

