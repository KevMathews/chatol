import React from 'react';
import { Grid, Box } from '@material-ui/core';
export default function Form(props) {
	return (
		<div className="signInContainerDiv">
			{/* <Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={1}
			> */}
			{/* <Grid item xs={10} sm={10} md={12}> */}
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
			{/* </Grid>
			</Grid> */}
		</div>
	);
}
