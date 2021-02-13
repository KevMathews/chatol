import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function BlogPost(props) {
	const [blog, setBlog] = useState({});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/blogs/${props.match.params.id}`);
				const data = await response.json();
				setBlog(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<div>
			<h1>{blog.title ? blog.title : ''}</h1>
			<p>{blog.body ? blog.body : ''}</p>
			<Link to={`/${blog._id}/edit`}>
				<button>Update this Blog Post</button>
			</Link>
			<ul>
				{blog.comments && blog.comments.length
					? blog.comments.map(comment => {
							return (
								<li key={comment._id}>
									<h3>{comment.name} says...</h3>
									<p>{comment.message}</p>
									<small>{comment.createdAt}</small>
								</li>
							);
					  })
					: ''}
			</ul>
		</div>
	);
}
