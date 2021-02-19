import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import LiveChat from '../pages/LiveChat';
import BlogPost from '../pages/BlogPost';
import UpdatePost from '../pages/UpdatePost';
import Home from '../pages/Home';
import Forums from '../pages/Forums';
const routes = [
	{
		Component: LiveChat,
		key: 'LiveChat',
		path: '/LiveChat'
	},
	{
		Component: Forums,
		key: 'In Memory Of...',
		path: '/Forums'
	},

	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: UpdatePost,
		key: 'UpdatePost',
		path: '/:id/edit'
	},
	{
		Component: BlogPost,
		key: 'BlogPost',
		path: '/:id'
	},
	{
		Component: App,
		key: 'Home',
		path: '/'
	}
];
export default routes;
