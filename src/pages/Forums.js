import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

export default function Forums(props) {
	const [blogs, setBlogs] = useState([]);
	const titleInput = useRef(null);
	const bodyInput = useRef(null);
	const nameInput = useRef(null);
	const timestamp = Date.now();
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
		const nameValue = nameInput.current.value;
		try {
			const response = await fetch('/api/blogs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameValue,
					title: titleValue,
					body: bodyValue
				})
			});
			const data = await response.json();
			setBlogs([data, ...blogs]);
		} catch (error) {
			console.error(error);
		} finally {
			titleInput.current.value = '';
			bodyInput.current.value = '';
			nameInput.current.value = '';
		}
	};
	return (
		<div className="forumsContainer">
			<div className="innerForumsContainer">
				<img src="/img/smalltitle.png" />
				<button>
					<a href="#bottom">Jump to Bottom of the Page</a>
				</button>
				<div className="forumsPage">
					{blogs.map(blog => {
						return (
							<div key={blog._id}>
								<Link to={`/${blog._id}`}>
									<h4 className="blogTitles">Title: {blog.title}</h4>
								</Link>
								<h5 className="blogName">From: {blog.name}</h5>

								<h6 className="blogBody">{blog.body}</h6>
								<p className="createdOn">
									created on: <Moment>{blog.createdAt}</Moment>
								</p>
								<br />
								<hr />
								<br />
							</div>
						);
					})}
					<br />
					<hr className="forumHr" />
					<br />
					<div className="createMessageDiv">
						<h3>Post your Memories Below:</h3>
						<form
							style={{ display: 'flex', flexDirection: 'column' }}
							onSubmit={handleSubmit}
						>
							{' '}
							<label>
								{' '}
								Title:
								<input
									type="text"
									className="form-control"
									placeholder="Title of post"
									name="title"
									ref={titleInput}
								/>
								{/* <input type="text" size="25" ref={titleInput} /> */}
							</label>
							<label>
								Name:
								<input
									type="text"
									className="form-control"
									placeholder="Your Name"
									name="name"
									ref={nameInput}
								/>
							</label>
							<label>
								{' '}
								Body:
								<textarea
									className="form-control"
									cols="30"
									rows="6"
									placeholder="Your message"
									name="message"
									ref={bodyInput}
								></textarea>
								{/* <input type="text" ref={bodyInput} /> */}
							</label>
							<input type="submit" value="Submit Your Post" />
						</form>
						<div id="bottom"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
