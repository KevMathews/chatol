// Was a lot of fun learning how to use socket.io and suprising easy to implement.
// Arthur had suggested I try adding video chat using WebRTC which after looking
// into seemed very doable yet again though time was the issue :( I had made it
// so you could add or delete rooms but thought that could eventually be a
// problem so just left them hard coded in.  Also used Immer which I
// originally learned about from a Youtube video by Ben Awad.   Not sure if
// anyone will read any of these notes I wrote other then the instructors,
// but if you do highly recommend his channel! :) https://www.youtube.com/user/99baddawg

// I tried to add as many notes below as I could to explain the general
// flow of the code and what each part is for.  Any feedback from Arthur
// or any other instructor, especially on how to fix my bug on personal
// messaging so i can get it to work, would be MUCH appreciated! :)


import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Form from '../components/UsernameForm';
import Chat from '../components/Chat';
import io from 'socket.io-client';
import immer from 'immer';
import { getOwnPropertyDescriptors } from 'immer/dist/internal'

//  object which contains the messages from the rooms,
// and the messages from each room is held in arrays.
// matches teh sever side code and if you join the
// chat late you will be sent messages that you missed
const initialMessagesState = {
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

export default function Home() {
	//  set states here
	// username input from the Form component is controlled here
	const [username, setUsername] = useState('');
	//  lets me know if user is connected and whether the Form component to login, or the Chat
	// component once logged in, should be rendered
	const [connected, setConnected] = useState(false);
	//  used to detect if you are currently in a chat room default i put the user in general channel
	const [currentChat, setCurrentChat] = useState({
		isChannel: true,
		chatName: 'General',
		receiverID: ''
	});
	// determines whether you are connected to a specific room or not
	const [connectedRooms, setConnectedRooms] = useState(['General']);
	// allows the users connected to be displayed in a list on the side of the chat
	const [allUsers, setAllUsers] = useState([]);
	// object which contains all of the messages in all the rooms
	const [messages, setMessages] = useState(initialMessagesState);
	// actual messages sent are bound to here
	const [message, setMessage] = useState('');
	//  this defines the ref that houses the actual socetk.io connected client
	const socketRef = useRef();

	//  calls setmessage from state passing in the value from the text area
	function handleMessageChange(e) {
		setMessage(e.target.value);
	}

	//  used UseEffect to reset messages to and empty string
	useEffect(() => {
		setMessage('');
	}, [messages]);

	// payload object is whats sent down to the server when
	// emitting the sendmessage event
	function sendMessage() {
		const payload = {
			content: message,
			to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverID,
			sender: username,
			chatName: currentChat.chatName,
			isChannel: currentChat.isChannel
		};
		// calls the emit method sending the message and passing down the payload object
		socketRef.current.emit('send message', payload);
		// below build up the state to be able to show the messages on screen.
		// and sets it tp newMessages. Immer handles immutability here
		const newMessages = immer(messages, draft => {
			draft[currentChat.chatName].push({
				sender: username,
				content: message
			});
		});
		// newmessages is then passed to setmessages function that updates that
		// state and then renders it on screen.  State wasn't mutated here at all
		// because of Immer
		setMessages(newMessages);
	}
	//  goes to the messages object in state and takes the unsent messages
	// in state and indexs into the key of room gets those messages and sets
	// them to const newMessages which can be broadcast out to new people
	// entering the room
	function roomJoinCallback(incomingMessages, room) {
		const newMessages = immer(messages, draft => {
			draft[room] = incomingMessages;
		});
		setMessages(newMessages);
	}
	//  calls immer function passes in connected rooms we get from
	// state the passes the room we are joining into our rooms array
	function joinRoom(room) {
		const newConnectedRooms = immer(connectedRooms, draft => {
			draft.push(room);
		});
		//  emit the joinroom event to the server then
		// calls the roomjoinroom callback function to load prior missed
		// messages on screen as you load into a room
		socketRef.current.emit('join room', room, messages =>
			roomJoinCallback(messages, room)
		);
		//  passes new connected room to  the setconnectedrooms function from state
		setConnectedRooms(newConnectedRooms);
	}

	function toggleChat(currentChat) {
		if (!messages[currentChat.chatName]) {
			const newMessages = immer(messages, draft => {
				draft[currentChat.chatName] = [];
			});
			setMessages(newMessages);
		}
		setCurrentChat(currentChat);
	}

	function handleChange(e) {
		e.preventDefault();
		setUsername(e.target.value);
	}

	function connect() {
		setConnected(true);
		socketRef.current = io.connect('/');
		socketRef.current.emit('join server', username);
		socketRef.current.emit('join room', 'General', messages =>
			roomJoinCallback(messages, 'General')
		);
		socketRef.current.on('new user', allUsers => {
			setAllUsers(allUsers);
		});
		socketRef.current.on('new message', ({ content, sender, chatName }) => {
			setMessages(messages => {
				const newMessages = immer(messages, draft => {
					if (draft[chatName]) {
						draft[chatName].push({ content, sender });
					} else {
						draft[chatName] = [{ content, sender }];
					}
				});
				return newMessages;
			});
		});
	}

	//  If connected below renders the Chat component else  it renders the Form
	// component to login
	let body;
	if (connected) {
		body = (
			<Chat
				message={message}
				handleMessageChange={handleMessageChange}
				sendMessage={sendMessage}
				yourId={socketRef.current ? socketRef.current.id : ''}
				allUsers={allUsers}
				joinRoom={joinRoom}
				connectedRooms={connectedRooms}
				currentChat={currentChat}
				toggleChat={toggleChat}
				messages={messages[currentChat.chatName]}
			/>
		);
	} else {
		body = (
			<Form username={username} onChange={handleChange} connect={connect} />
		);
	}

	return <div>{body}</div>;
}
