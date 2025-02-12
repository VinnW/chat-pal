// Express, Firebase, WebSocket Setup
const express = require('express')
const app = express();
const cors = require("cors")
const http = require('http');
const { Server } = require("socket.io");

const admin = require("firebase-admin");
const serviceAccount = require("./chat-pal-1801e-firebase-adminsdk-jitgf-02bea66218.json");
const { sign } = require('crypto');

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

let signedUser;
let User = {
  userName: "",
  gmail: "",
  contacts: []
}

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // signUp.tsx backend function
  socket.on("login_register_user", (username, gmail) => {
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.data().gmail == gmail){
          User = doc.data()
          return console.log(`User ${User.gmail} has logged in`)
        }
      })
    })
    
    console.log(signedUser)
    if(signedUser == false){
      User['userName'] = username
      User['gmail'] = gmail
      User['contacts'] = []
      db.collection("users").add(User).then((docRef) => {
        console.log(`User with id: ${docRef.id}\ngmail: ${User.gmail}\nusername: ${User.userName}\nhas been registered`);
      })
    }
  })
  // signUp.tsx backend function


  // Chat.tsx backend function
  
  // Chat.tsx backend function

})



server.listen(8080, () => {
  console.log('listening on PORT: 8080');
})