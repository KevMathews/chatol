import React from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
	height: 95vh;
	width: 95%;
	display: flex;
	background-color: #fafafa;
	justify-content: center;
`;

const SideBar = styled.div`
	height: 100%;
	width: 16vw;

	margin-left: 8px;
	padding-left: 3px;
	overflow: scroll;
`;

const ChatPanel = styled.div`
	height: 100;
	width: 80vw;
	display: flex;
	flex-direction: column;
`;

const BodyContainer = styled.div`
	width: 94.5%;
	padding: 10px;
	padding-left: 20px;
	height: 75%;
	overflow: scroll;
	border-bottom: 13px solid #0083ff;
	border-left: 13px solid #0083ff;
	border-right: 13px solid #0083ff;
	border-top: 13px solid #0083ff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const TextBox = styled.textarea`
	height: 15vh;
	width: 94.5%;
	padding: 10px;
	border-bottom: 13px solid #0083ff;
	border-right: 13px solid #0083ff;
	border-left: 13px solid #0083ff;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

const ChannelInfo = styled.div`
	height: 10%;
	width: 100%;
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
			<button onClick={() => props.joinRoom(props.currentChat.chatName)}>
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
			<Container>
				<SideBar>
					<h3>Channels</h3>
					<hr className="sidePanelHr" />
					{rooms.map(renderRooms)}
					<br />
					<h3>All Users</h3>
					<hr className="sidePanelHr" />
					{props.allUsers.map(renderUser)}
				</SideBar>
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
					{/* <input onChange={props.selectFile} type="file" /> */}
				</ChatPanel>
			</Container>
		</div>
	);
}
