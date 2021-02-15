require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
// const { SSL_OP_NO_TICKET } = require('constants');
const io = socket(server)

const MONGODB_URI = process.env.MONGODB_URI

const db = mongoose.connection;
let users = [];
const messages = {
	General: [],
	Arts: [],
	Celebrities: [],
	Food: [],
	Health: [],
	Jokes: [],
	Javascript: [],
	Movies: [],
	Music: [],
	News: [],
	Places: [],
	Romance: [],
	Sports: []
};

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	useFindAndModify: false
});
db.on('open', () => {
    console.log('Mongo is Connected');
});
//  originally how i had server.io setup on server side
// io.on("connection", socket => {
//     socket.emit("your id", socket.id);
//     socket.on("send message", body => {
//         io.emit("message", body)
//     })
// })

//  below are changes made for room/user added below ///
io.on('connection', socket => {
	socket.on("join server", (username) => {
		const user = {
			username,
			id: socket.id,
		};
		users.push(user);
		io.emit("new user", users);
	});

	socket.on("join room", (roomName, cb) => {
		socket.join(roomName);
		cb(messages[roomName]);
		socket.emit("joined", messages[roomName]);
	});

	socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
		if (isChannel) {
			const payload = {
				content,
				chatName,
				sender,
			};
			socket.to(to).emit("new message", payload);
		} else {
			const payload = {
				content,
				chatName: sender,
				sender
			};
			socket.to(to).emit("new message", payload);
		}
		if (messages[chatName]) {
			messages[chatName].push({
				sender,
				content
			});
		}
	});

	socket.on("disconnect", () => {
		users = users.filter(u => u.id !== socket.id);
		io.emit("new user", users);
	});
});



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

// server.listen(8000, () => console.log("Listening in on port 8000"));
server.listen(PORT || 5000);
