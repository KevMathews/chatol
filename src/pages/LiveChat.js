import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Form from '../components/UsernameForm';
import Chat from '../components/Chat';
import io from 'socket.io-client';
import immer from 'immer';

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
	const [username, setUsername] = useState('');
	const [connected, setConnected] = useState(false);
	const [currentChat, setCurrentChat] = useState({
		isChannel: true,
		chatName: 'General',
		receiverID: ''
	});
	const [connectedRooms, setConnectedRooms] = useState(['General']);
	const [allUsers, setAllUsers] = useState([]);
	const [messages, setMessages] = useState(initialMessagesState);
	const [message, setMessage] = useState('');
	const [file, setFile] = useState();
	const socketRef = useRef();

	function handleMessageChange(e) {
		setMessage(e.target.value);
	}

	useEffect(() => {
		setMessage('');
	}, [messages]);

	function sendMessage() {
		const payload = {
			content: message,
			to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverID,
			sender: username,
			chatName: currentChat.chatName,
			isChannel: currentChat.isChannel
		};
		socketRef.current.emit('send message', payload);
		const newMessages = immer(messages, draft => {
			draft[currentChat.chatName].push({
				sender: username,
				content: message
			});
		});
		setMessages(newMessages);
	}

	function roomJoinCallback(incomingMessages, room) {
		const newMessages = immer(messages, draft => {
			draft[room] = incomingMessages;
		});
		setMessages(newMessages);
	}

	function joinRoom(room) {
		const newConnectedRooms = immer(connectedRooms, draft => {
			draft.push(room);
		});

		socketRef.current.emit('join room', room, messages =>
			roomJoinCallback(messages, room)
		);
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

	function selectFile(e) {
		setMessage(e.target.files[0].name);
		setFile(e.target.files[0]);
	}

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
				selectFile={selectFile}
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
