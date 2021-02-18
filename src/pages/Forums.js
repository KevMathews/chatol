import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
export default function Forums(props) {
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
	return (
		<div className="forumsPage">
			{blogs.map(blog => {
				return (
					<div key={blog._id}>
						<Link to={`/${blog._id}`}>
							<h2 className="blogTitles">{blog.title}</h2>
						</Link>
						<p className="blogBody">{blog.body}</p>
					</div>
				);
			})}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleSubmit}
			>
				<label>
					{' '}
					Title: <input type="text" ref={titleInput} />
				</label>
				<label>
					{' '}
					Body: <input type="text" ref={bodyInput} />
				</label>
				<input type="submit" value="Create MicroBlog" />
			</form>
		</div>
	);
}
