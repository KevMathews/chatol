//  Learned a lot building this app, especially with usestate useeffect and useref.  Still
// not completely positive on when is the best time to use useeffect in certain situations
// but definitely getting more comfortable.
// The site unfortunately isnt built to be 100% responsive.  Some pages are, but ran out of
// time so its just designed with desktop viewing in mind.

// The intro/dial in to AOL part I originally tried to make 100% in css but that was taking a
// LONG time to figure out, so to save time ended up building it out in Photoshop.  If I expand
// on this for the 5th project I definitely want to try and see how far I can push animations
// completely done in CSS.

import { ExpansionPanelDetails, responsiveFontSizes } from '@material-ui/core';
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
