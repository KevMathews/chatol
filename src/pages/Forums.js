// Another area of the app that I ran out of time when building...  Wanted to
// add the ability to add replies, as well as when you post have it so you
// could add an emoji where you could lay a wreath, light a candle, or pour
// one out in your memorial post :)

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

export default function Forums(props) {
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
			setBlogs([...blogs, data]);
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
				<img className="forumGif" src="/img/forumstitlegif.gif" />
				<br />
				<div className="forumsTopTextDiv">
					<p className="forumsTopText">
						Gone, but certainly not forgotten, are the early days of America
						Online. This site was made to pay homage to the AOL that once was...
					</p>
					<p className="forumsTopText">
						Pay tribute by posting your random thoughts or memories below!
					</p>
				</div>
				<br />
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
									created on:
									<Moment>{blog.createdAt}</Moment>
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
						<h3>Post your Memories Here:</h3>
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
									placeholder="Your name"
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
