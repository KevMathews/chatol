import React from 'react';

export default function Form(props) {
	return (
		<div className="signInContainerDiv">
			<div className="signInTitleDiv">
				<div className="signInDiv">
					<img
						className="loginPageTitleImage"
						src="https://i.imgur.com/CzW2kzM.png"
					/>
					<form>
						<input
							type="text"
							value={props.username}
							onChange={props.onChange}
							placeholder="Enter User Name..."
						/>
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button onClick={props.connect}>Enter Chat</button>
					</form>
				</div>
			</div>
		</div>
	);
}
