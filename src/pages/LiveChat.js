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

// const Page = styled.div`
// 	display: flex;
// 	height: 95vh;
// 	width: 100%;
// 	align-items: center;
// 	background-color: #8fddfc;
// 	flex-direction: column;
// `;

// const Container = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	height: 60vh;
// 	max-height: 500px;
// 	overflow: auto;
// 	width: 800px;
// 	background-color: white;
// 	border: 3px solid #444bff;
// 	border-radius: 10px;
// 	padding-bottom: 10px;
// 	margin-top: 25px;
// `;

// const TextArea = styled.textarea`
// 	width: 100%;
// 	height: 100px;
// 	border: 3px solid #444bff;
// 	border-radius: 10px;
// 	margin-top: 10px;
// 	padding-left: 10px;
// 	padding-top: 10px;
// 	font-size: 17px;
// 	background-color: white;
// 	outline: none;
// 	color: #004387;
// 	letter-spacing: 1px;
// 	line-height: 18px;
// 	::placeholder {
// 		color: #444bff;
// 	}
// `;

// const Button = styled.button`
// 	background-color: white;
// 	border: 3px solid #444bff;
// 	width: 100%;
// 	height: 50px;
// 	border-radius: 10px;
// 	color: #46516e;
// 	font-size: 17px;
// `;

// const Form = styled.form`
// 	width: 800px;
// `;

// const MyRow = styled.div`
// 	width: 100%;
// 	display: flex;
// 	justify-content: flex-start;
// 	margin-top: 5px;
// `;

// const MyMessage = styled.div`
// 	width: 90%;
// 	background-color: transparent;
// 	color: #004387;
// 	padding: 5px;
// 	margin-right: 5px;
// 	text-align: left;
// `;

// const PartnerRow = styled(MyRow)`
// 	justify-content: flex-start;
// `;

// const PartnerMessage = styled.div`
// 	width: 90%;
// 	background-color: transparent;
// 	color: red;
// 	padding: 5px;
// 	margin-left: 5px;
// 	text-align: left;
// `;
// export default function LiveChat(props) {
// 	// return <div className="HomePage">This is the {props.page} page</div>;
// 	// }
// 	const [yourID, setYourID] = useState();
// 	const [messages, setMessages] = useState([]);
// 	const [message, setMessage] = useState('');

// 	const socketRef = useRef();

// 	useEffect(() => {
// 		socketRef.current = io.connect('/');

// 		socketRef.current.on('your id', id => {
// 			setYourID(id);
// 		});

// 		socketRef.current.on('message', message => {
// 			console.log('here');
// 			receivedMessage(message);
// 		});
// 	}, []);

// 	function receivedMessage(message) {
// 		setMessages(oldMsgs => [...oldMsgs, message]);
// 	}

// 	function sendMessage(e) {
// 		e.preventDefault();
// 		const messageObject = {
// 			body: message,
// 			id: yourID
// 		};
// 		setMessage('');
// 		socketRef.current.emit('send message', messageObject);
// 	}

// 	function handleChange(e) {
// 		setMessage(e.target.value);
// 	}

// 	return (
// 		<Page>
// 			<Container>
// 				{messages.map((message, index) => {
// 					if (message.id === yourID) {
// 						return (
// 							<MyRow key={index}>
// 								<MyMessage>{message.body}</MyMessage>
// 							</MyRow>
// 						);
// 					}
// 					return (
// 						<PartnerRow key={index}>
// 							<PartnerMessage>{message.body}</PartnerMessage>
// 						</PartnerRow>
// 					);
// 				})}
// 			</Container>
// 			<Form onSubmit={sendMessage}>
// 				<TextArea
// 					value={message}
// 					onChange={handleChange}
// 					placeholder="Say something..."
// 				/>
// 				<Button>Send</Button>
// 			</Form>
// 		</Page>
// 	);
// }
