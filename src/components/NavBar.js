import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';

const NavBar = props => {
	return (
		// <Grid
		// 	container
		// 	direction="row"
		// 	justify="center"
		// 	alignItems="center"
		// 	spacing={4}
		// >
		<nav className="NavBar">
			{props.routes
				.filter(item => !item.path.includes(':'))
				.map(({ key, path }) => (
					// <Grid item xs={8} className="navItems">
					<Link key={key} to={path}>
						{key}
					</Link>
					// </Grid>
				))}
		</nav>
		// </Grid>
	);
};

export default NavBar;
