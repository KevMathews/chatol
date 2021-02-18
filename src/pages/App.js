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
	const loadingimg = '/img/logingif.gif' + '?a=' + Math.random();
	return (
		<div className="AppPage">
			<div className="mainPageContainer">
				<div
					className="loginGifDiv"
					style={{ display: isVisible ? 'block' : 'none' }}
				>
					<img className="loginGifs" src={loadingimg} />
				</div>
				<div
					className="connectToChatterOnlineDiv"
					style={{ display: isInvisible ? 'none' : 'block' }}
				>
					<img className="loginGifs" src="/img/login.jpg" />
					<br />
					<img
						src="/img/signon1.png"
						className="mainPageConnectButton"
						onClick={() => play()}
					>
						{/* <h3>Connect to Chatter Online</h3> */}
					</img>
					{/* <input type="button" value="Go Online" onClick={() => play()} /> */}
				</div>
			</div>
			<audio src="img/login.mp3" ref={audioRef}></audio>
			<div>
				<p className="introPart1">
					The late 90's were a great time to be alive, and with your 9600 baud
					modem (14,400 if you were hot stuff) you could access the web via
					America Online. With the implementation of their live chat rooms it
					was the place to be online to meet and connect with people.
				</p>
				<p className="introPart2">
					{' '}
					This site was made to pay homage to AOL, and more specifically the
					live chat rooms that they had. So come in, meet some new friends in
					chat, and be sure to post a memory you might have about AOL on the 'In
					Memory Of' message board.
				</p>
			</div>
		</div>
	);
}
