//  tried doing something different and played around with npm styled-components to build/style the chat page
import React from 'react';
import styled from 'styled-components';

//  rooms just hard coded in
const rooms = [
	'General',
	'Food',
	'Health',
	'Movies',
	'Music',
	'News',
	'Places',
	'Romance',
	'Sports'
];
const Section = styled.div`
	background: url('/img/indexBackground2.jpg') no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	background-color: #008081;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;
const Container = styled.div`
	height: 70vh;
	width: 65%;
	display: flex;
	background-color: #fafafa;
	justify-content: center;
	box-shadow: 1px 1px 28px 10px rgba(87, 89, 89, 1);
	-webkit-box-shadow: 1px 1px 28px 10px rgba(87, 89, 89, 1);
	-moz-box-shadow: 1px 1px 28px 10px rgba(87, 89, 89, 1);
	border: 2px solid black;
`;
const SideBar = styled.div`
	height: auto;
	width: 16vw;
	margin-top: 10px;
	margin-left: 8px;
	padding-left: 3px;
	overflow: scroll;
	background-color: #fafafa;
`;

const ChatPanel = styled.div`
	height: 85;
	width: 84vw;
	display: flex;
	flex-direction: column;
	background-color: #f0f0f0;
`;

const BodyContainer = styled.div`
	width: 94.5%;
	padding: 10px;
	padding-left: 20px;
	height: 75%;
	overflow: scroll;
	border-bottom: 13px solid ##4ddaf9;
	border-left: 13px solid #4ddaf9;
	border-right: 13px solid #4ddaf9;
	border-top: 13px solid #4ddaf9;
`;
const TextBox = styled.textarea`
	height: 15vh;
	width: 94.5%;
	padding: 10px;
	border-bottom: 13px solid #4ddaf9;
	border-right: 13px solid #4ddaf9;
	border-left: 13px solid #4ddaf9;
	border-top: 13px solid #4ddaf9;
`;

const ChannelInfo = styled.div`
	display: flex;
	height: 10%;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const Row = styled.div`
	cursor: pointer;
`;

const Messages = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export default function Chat(props) {
	function renderRooms(room) {
		const currentChat = {
			chatName: room,
			isChannel: true,
			receiverId: ''
		};
		return (
			<Row onClick={() => props.toggleChat(currentChat)} key={room}>
				{room}
			</Row>
		);
	}

	function renderUser(user) {
		if (user.id === props.yourId) {
			return <Row key={user.id}>You: {user.username}</Row>;
		}
		const currentChat = {
			chatName: user.username,
			isChannel: false,
			receiverId: user.id
		};
		return (
			<Row
				onClick={() => {
					props.toggleChat(currentChat);
				}}
				key={user.id}
			>
				{user.username}
			</Row>
		);
	}

	function renderMessages(message, index) {
		return (
			<div key={index}>
				<span className="messageSender">{message.sender}</span>: &nbsp;&nbsp;
				<span className="messageText">{message.content}</span>
			</div>
		);
	}

	let body;
	if (
		!props.currentChat.isChannel ||
		props.connectedRooms.includes(props.currentChat.chatName)
	) {
		body = <Messages>{props.messages.map(renderMessages)}</Messages>;
	} else {
		body = (
			<button
				className="joinChannelButton"
				onClick={() => props.joinRoom(props.currentChat.chatName)}
			>
				Join the {props.currentChat.chatName} Channel
			</button>
		);
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			props.sendMessage();
		}
	}

	return (
		<div className="liveChatDiv">
			<Section>
				<Container>
					<ChatPanel>
						<ChannelInfo>
							<span className="chatChannelName">
								{props.currentChat.chatName}
							</span>
							<img className="chatPageLogo" src="/img/smalltitle.png" />
						</ChannelInfo>
						<BodyContainer>{body}</BodyContainer>
						<TextBox
							value={props.message}
							onChange={props.handleMessageChange}
							onKeyPress={handleKeyPress}
							placeholder="say something..."
						/>
					</ChatPanel>
					<SideBar>
						<h3>Channels</h3>
						<hr className="sidePanelHr" />
						{rooms.map(renderRooms)}
						<br />
						<h3>People Here</h3>
						<hr className="sidePanelHr" />
						{props.allUsers.map(renderUser)}
					</SideBar>
				</Container>
			</Section>
		</div>
	);
}
