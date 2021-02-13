import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const Page = styled.div`
	display: flex;
	height: 95vh;
	width: 100%;
	align-items: center;
	background-color: white;
	flex-direction: column;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 60vh;
	max-height: 500px;
	overflow: auto;
	width: 800px;
	background-color: white;
	border-radius: 10px;
	padding-bottom: 10px;
	margin-top: 25px;
`;
const TextArea = styled.textarea`
	width: 100%;
	height: 100px;
	border-radius: 10px;
	margin-top: 10px;
	padding-left: 10px;
	padding-top: 10px;
	font-size: 17px;
	background-color: white;
	outline: none;
	color: #004387;
	letter-spacing: 1px;
	line-height: 18px;
	::placeholder {
		color: #444bff;
	}
`;

const Button = styled.button`
	background-color: white;

	width: 20%;
	height: 50px;
	border-radius: 10px;
	color: #46516e;
	font-size: 17px;
`;

const Form = styled.form`
	width: 800px;
`;

const MyRow = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	margin-top: 5px;
`;

const MyMessage = styled.div`
	width: 90%;
	background-color: transparent;
	color: #004387;
	padding: 5px;
	margin-right: 5px;
	text-align: left;
`;

const PartnerRow = styled(MyRow)`
	justify-content: flex-start;
`;

const PartnerMessage = styled.div`
	width: 90%;
	background-color: transparent;
	color: red;
	padding: 5px;
	margin-left: 5px;
	text-align: left;
`;
export default function LiveChat(props) {
	const [yourID, setYourID] = useState();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = io.connect('/');

		socketRef.current.on('your id', id => {
			setYourID(id);
		});

		socketRef.current.on('message', message => {
			console.log('here');
			receivedMessage(message);
		});
	}, []);

	function receivedMessage(message) {
		setMessages(oldMsgs => [...oldMsgs, message]);
	}

	function sendMessage(e) {
		e.preventDefault();
		const messageObject = {
			body: message,
			id: yourID
		};
		setMessage('');
		socketRef.current.emit('send message', messageObject);
	}

	function handleChange(e) {
		setMessage(e.target.value);
	}

	return (
		<Page>
			<Container>
				{messages.map((message, index) => {
					if (message.id === yourID) {
						return (
							<MyRow key={index}>
								<MyMessage>{message.body}</MyMessage>
							</MyRow>
						);
					}
					return (
						<PartnerRow key={index}>
							<PartnerMessage>{message.body}</PartnerMessage>
						</PartnerRow>
					);
				})}
			</Container>
			<Form onSubmit={sendMessage}>
				<TextArea
					value={message}
					onChange={handleChange}
					placeholder="Say Hi..."
				/>
				<Button>Send</Button>
			</Form>
		</Page>
	);
}
