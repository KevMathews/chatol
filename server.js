require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server)

const MONGODB_URI = process.env.MONGODB_URI

const db = mongoose.connection;
let users = [];
const messages = {
	general: [],
	random: [],
	jokes: [],
	javascript: []
};

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	useFindAndModify: false
});
db.on('open', () => {
    console.log('Mongo is Connected');
});
io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

/* Middleware */
app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
app.use(express.static('public'))
}
app.use(/\.[0-9a-z]+$/i, express.static('public'));
/* Controller Goes Here Remove the tes*/
app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/comments', require('./controllers/comments'))
/* Controller Ends here */
//LISTENER


// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

// app.listen(PORT, () => {
//     console.log(`API Listening on port ${PORT}`);
// });

server.listen(8000, () => console.log("Listening in on port 8000"));
