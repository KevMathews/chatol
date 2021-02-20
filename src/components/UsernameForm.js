import React from 'react';

export default function Form(props) {
	return (
		<div className="signInContainerDiv">
			<div className="signInTitleDiv">
				<div className="signInDiv">
					<img className="loginPageTitleImage" src="/img/smalltitle.png" />
					<br />
					<form>
						<input
							type="text"
							value={props.username}
							onChange={props.onChange}
							placeholder="Enter User Name..."
						/>
						<br />
						<br />
						<div className="signInButtonDiv">
							<button className="signInButton" onClick={props.connect}>
								Enter Chat
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
