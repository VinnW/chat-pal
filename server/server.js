// Express, Firebase, WebSocket Setup
const express = require('express')
const app = express();
const cors = require("cors")
const http = require('http');
const { Server } = require("socket.io");

const admin = require("firebase-admin");
const serviceAccount = require("./chat-pal-1801e-firebase-adminsdk-jitgf-1f5d8f88d0.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-pal-1801e-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})
// Express, Firebase, WebSocket Setup

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // signUp.tsx backend function
  socket.on("login_register_user", (username, gmail) => {
    db.collection("users").where("gmail", "==", gmail).get().then((querySnapshot) => {
      if(querySnapshot.empty){
        const User = {
          username: username,
          gmail: gmail,
          contacts: []
        }
        db.collection("users").add(User).then((docRef) => {
          console.log(`${gmail} has signed up with ID: ${docRef.id}`)
        })
      }else{
        console.log(`${gmail} has logged in`)
      }
    })
  })
  // signUp.tsx backend function


  // Chat.tsx backend function
  
  // Chat.tsx backend function

})



server.listen(8080, () => {
  console.log('listening on PORT: 8080');
})