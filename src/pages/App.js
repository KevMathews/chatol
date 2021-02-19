import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

export default function App(props) {
	const [isVisible, setIsVisible] = useState(false);
	const [isInvisible, setInvisible] = useState(false);

	const toggleConnectingToChatterOnline = () => {};
	const [blogs, setBlogs] = useState([]);
	const titleInput = useRef(null);
	const bodyInput = useRef(null);
	const nameInput = useRef(null);
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
						className="mainPageConnectButton"
						src="/img/signon1.png"
						onClick={() => play()}
					></img>
				</div>
				<audio src="img/login.mp3" ref={audioRef}></audio>
			</div>
		</div>
	);
}
