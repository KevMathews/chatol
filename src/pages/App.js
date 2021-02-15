import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

export default function App(props) {
	const [isVisible, setIsVisible] = useState(false);
	const [isInvisible, setInvisible] = useState(false);

	const toggleConnectingToChatterOnline = () => {};
	const [blogs, setBlogs] = useState([]);
	const titleInput = useRef(null);
	const bodyInput = useRef(null);
	useEffect(() => {
		// Immediately Invoked Function Expression
		(async () => {
			try {
				const response = await fetch('/api/blogs');
				const data = await response.json();
				setBlogs(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleSubmit = async e => {
		e.preventDefault();
		const titleValue = titleInput.current.value;
		const bodyValue = bodyInput.current.value;
		try {
			const response = await fetch('/api/blogs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleValue,
					body: bodyValue
				})
			});
			const data = await response.json();
			setBlogs([...blogs, data]);
		} catch (error) {
			console.error(error);
		}
	};
	const audioRef = useRef(null);
	const play = url => {
		audioRef.current.play();
		setIsVisible(!isVisible);
		setInvisible(!isInvisible);
	};

	return (
		<div className="AppPage">
			<div className="mainPageContainer">
				<div
					className="loginGifDiv"
					style={{ display: isVisible ? 'block' : 'none' }}
				>
					<img src="/img/logingif.gif" />
				</div>
				<div
					className="connectToChatterOnlineDiv"
					style={{ display: isInvisible ? 'none' : 'block' }}
				>
					<img src="/img/mainlogo.png" />
					<br />
					<button className="mainPageConnectButton" onClick={() => play()}>
						<h3>Connect to Chatter Online</h3>
					</button>
					{/* <input type="button" value="Go Online" onClick={() => play()} /> */}
				</div>
			</div>
			<audio src="img/dial-up-modem-02.mp3" ref={audioRef}></audio>
		</div>
	);
}
