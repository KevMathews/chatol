//  designed around the idea of creating a parallax effect on this page, styled inline and
// unfortunately didnt have enough time to make it responsive :(
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
export default function About(props) {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.pageYOffset);

	function sendEmail(e) {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_g3psryf',
				'template_upqcam4',
				e.target,
				'user_pHbcRblfjyoPA9mVIva9d'
			)
			.then(
				result => {
					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
		e.target.reset();
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const renderContent = () => (
		<>
			<div className="About_Page__content__heading">
				<h2>Kevin Mathews</h2>
				<h4 className="About_Page__content__heading__text">
					Full Stack Software Engineer:
				</h4>
				<h2 className="About_Page__content__heading__caption">
					<p>
						I'm a web developer with a background in sales and entrepreneurship.
						As a business owner I learned how to handle and resolve a wide range
						of issues which now enables me to approach projects with confidence
						and creativity. I bring my passion for a clean and organized work
						product into each project, and I love nothing more then working as a
						team to find the most efficient and elegant solutions to complex
						problems.
					</p>
				</h2>
			</div>
			<div
				className="About_Page__content__heading1"
				style={{ transform: `translateY(-${offsetY * 0.3}px)` }}
			>
				<h2>PROJECTS</h2>
			</div>
			<div className="About_Page__content__heading2">
				<h2>
					<a
						href="https://toystore-km.herokuapp.com/store/main"
						target="_blank"
					>
						Toy Store
					</a>
				</h2>
				<h4 className="About_Page__content__heading__text">
					E-commerce storefront themed after Toy Story
				</h4>
			</div>
			<div className="About_Page__content__heading3">
				<h2>
					<a
						href="https://kevmathews.github.io/medieval-mayhem/"
						target="_blank"
					>
						Medieval Mayhem
					</a>
				</h2>
				<h4 className="About_Page__content__heading__text">
					2D Fighting game with RPG Elements
				</h4>
			</div>
			<div className="About_Page__content__heading4">
				<h2>
					<a href="https://groceries-km.herokuapp.com/" target="_blank">
						World of Groceries
					</a>
				</h2>
				<h4 className="About_Page__content__heading__text">
					Storefront with a shopping cart, and a shopping/todo list
				</h4>
				<h2>&amp;</h2>
				<h2>
					<a href="https://jeopardy-km.herokuapp.com/" target="_blank">
						JEOPARDY!
					</a>
				</h2>
				<h4 className="About_Page__content__heading__text">
					The classic game of Jeopardy with 150,000 + questions
				</h4>
			</div>
			<div className="About_Page__content__heading5">
				<h2 className="contactMe">Contact Me</h2>
				<form onSubmit={sendEmail}>
					<div className="row pt-5 mx-auto">
						<div className="col-8 form-group mx-auto">
							<input
								type="text"
								className="form-control"
								placeholder="Name"
								name="name"
							/>
						</div>
						<div className="col-8 form-group pt-2 mx-auto">
							<input
								type="email"
								className="form-control"
								placeholder="Email Address"
								name="email"
							/>
						</div>
						<div className="col-8 form-group pt-2 mx-auto">
							<input
								type="text"
								className="form-control"
								placeholder="Subject"
								name="subject"
							/>
						</div>
						<div className="col-8 form-group pt-2 mx-auto">
							<textarea
								className="form-control"
								id=""
								cols="30"
								rows="8"
								placeholder="Your message"
								name="message"
							></textarea>
						</div>
						<div className="col-8 pt-3 mx-auto">
							<input
								type="submit"
								className="btn btn-info"
								value="Send Message"
							></input>
						</div>
					</div>
				</form>
			</div>
			<div
				className="About_Page__content__cta"
				style={{ transform: `translateY(-${offsetY * 0.8}px)` }}
			>
				<a
					href="https://toystore-km.herokuapp.com/"
					target="_blank"
					alt="Toy Store"
					title="Toy Store"
				>
					{' '}
					<img src="/img/toystoreproject.png" />
				</a>
			</div>
			<div
				className="About_Page__content__cta2"
				style={{ transform: `translateY(-${offsetY * 0.8}px)` }}
			>
				<a
					href="https://kevmathews.github.io/medieval-mayhem/"
					target="_blank"
					alt="Medieval Mayhem"
					title="Medieval Mayhem"
				>
					{' '}
					<img src="/img/mayhemproject.png" />
				</a>
			</div>
			<div
				className="About_Page__content__cta3"
				style={{ transform: `translateY(-${offsetY * 0.8}px)` }}
			>
				{' '}
				<map name="image-map">
					<area
						target="_blank"
						alt="Jeopardy!"
						title="Jeopardy!"
						href="https://jeopardy-km.herokuapp.com/"
						coords="517,209,634,210,630,477,128,479,129,211"
						shape="poly"
					/>
					<area
						target="_blank"
						alt="Kev's World of Groceries"
						title="Kev's World of Groceries"
						href="https://groceries-km.herokuapp.com/"
						coords="12,9,9,275,123,278,129,210,513,208,511,9"
						shape="poly"
					/>
				</map>
				<img src="/img/jeopardy-groceryprojects.png" usemap="#image-map" />
			</div>
		</>
	);

	return (
		<div className="aboutPageContainerDiv">
			<section className="About_Page">
				<div
					className="About_Page__background"
					style={{ transform: `translateY(-${offsetY * 0.8}px)` }}
				/>
				<div className="firstAreaDiv">
					<div
						className="pictureDiv"
						style={{ transform: `translateY(-${offsetY * 1.2}px)` }}
					>
						<img className="aboutPicture" src="/img/aboutimage.gif" />
					</div>
				</div>

				<div
					className="About_Page__background-triangles"
					style={{ transform: `translateY(${offsetY * 0.6}px)` }}
				/>
				<div className="About_Page__content">{renderContent()}</div>
			</section>
		</div>
	);
}
