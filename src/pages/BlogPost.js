import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
export default function BlogPost(props) {
	const [blog, setBlog] = useState({});
	// const replyNameInput = useRef(null);
	// const replyMessageInput = useRef(null);
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
	// const handleReplySubmit = async e => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch(`/api/comments`, {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				name: replyNameInput.current.value,
	// 				message: replyMessageInput.current.value,
	// 				blogID: blog._ID
	// 			})
	// 		});
	// 		const data = await response.json();
	// 		setBlog(data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		window.location.assign('/Forums');
	// 	}
	// };
	return (
		<div className="forumsContainer">
			<div className="innerForumsContainer">
				<img src="/img/smalltitle2.png" />
				<div className="forumsPage">
					<h4>From: {blog.name ? blog.name : ''}</h4>
					<h4>{blog.title ? blog.title : ''}</h4>
					<p>{blog.body ? blog.body : ''}</p>
					<Link to={`/${blog._id}/edit`}>
						<button>Update this Blog Post</button>
					</Link>
					<ul>
						{blog.comments && blog.comments.length
							? blog.comments.map(comment => {
									return (
										<li key={comment._id}>
											<h4>Reply From:{comment.name}</h4>
											<p>{comment.message}</p>
											<small>{comment.createdAt}</small>
										</li>
									);
							  })
							: ''}
					</ul>
					{/* Reply
					<form
						style={{ display: 'flex', flexDirection: 'column' }}
						onSubmit={handleReplySubmit}
					>
						<label>
							Name:
							<input
								type="text"
								className="form-control"
								placeholder="Name"
								name="Name"
								ref={replyNameInput}
							></input>
						</label>
						<label>
							Message:
							<input
								type="text"
								className="form-control"
								placeholder="Message"
								name="Message"
								ref={replyMessageInput}
							></input>
						</label>
						<input type="submit" value="Reply to post" />
					</form> */}
				</div>
			</div>
		</div>
	);
}
