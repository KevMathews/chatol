import React, { useState, useEffect, useRef } from 'react';
export default function UpdatePost(props) {
	const [blog, setBlog] = useState({
		name: '',
		title: '',
		body: ''
	});
	const [didDelete, setDidDelete] = useState(false);
	const titleInput = useRef(null);
	const bodyInput = useRef(null);
	const nameInput = useRef(null);

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
	}, [blog, didDelete]);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			setDidDelete(!didDelete);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/Forums');
		}
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					title: titleInput.current.value,
					body: bodyInput.current.value
				})
			});
			const data = await response.json();
			setBlog(data);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/Forums');
		}
	};

	return (
		<div className="forumsContainer">
			<div className="innerForumsContainer">
				<img src="/img/smalltitle2.png" />
				<div className="forumsPage">
					<h4>From: {blog.name ? blog.name : ''}</h4>
					<h4>{blog.title ? blog.title : ''}</h4>
					<p>{blog.body ? blog.body : ''}</p>
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
					<form
						style={{ display: 'flex', flexDirection: 'column' }}
						onSubmit={handleSubmit}
					>
						<label>
							{' '}
							Name:
							<input
								type="text"
								className="form-control"
								placeholder="Title of post"
								name="title"
								ref={nameInput}
								defaultValue={blog.name}
							/>
						</label>
						<label>
							{' '}
							Title:
							<input
								type="text"
								className="form-control"
								placeholder="Title of post"
								name="title"
								ref={titleInput}
								defaultValue={blog.title}
							/>
						</label>
						<label>
							Body:
							<textarea
								className="form-control"
								cols="30"
								rows="6"
								placeholder="Your message"
								name="message"
								ref={bodyInput}
								defaultValue={blog.body}
							></textarea>
						</label>
						<input type="submit" value="Update Your Post" />
						<br />
						<input
							type="submit"
							value="Delete Your Post"
							onClick={handleDelete}
						></input>
					</form>
				</div>
			</div>
		</div>
	);
}
