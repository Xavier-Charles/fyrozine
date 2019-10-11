import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import styled from 'styled-components';
import logo from '../img/FrozIintel.jpg';
import '../lib/fontAw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//! remove soonest
// import scrape from '../scraper/scraper';
// let dress_links = {
// 	torsoWaist: [ 'https://www.jumia.com.ng/womens-fashion/?q=fit%20flare&color_family=Red' ],
// 	ankleToe: [ 'https://www.jumia.com.ng/womens-fashion/?color_family=White&q=boat+shoe' ],
// 	hairNeck: [ 'https://www.jumia.com.ng/womens-fashion-accessories/?q=aviator%20sunglasses' ],
// 	acessories: [ 'https://www.jumia.com.ng/womens-fashion/?q=satchel&color_family=Red--Blue' ],
// 	thighAnkle: []
// };

var viewH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;
var viewW = viewH / 1.4;

function signOut(props) {
	Auth.signOut()
		.then((data) => {
			// console.log(data);
			// props.changeAuth(false);
			props.changeIsAuthing(true);
			console.log('You logged out');
			props.history.push('/signup');
		})
		.catch((err) => console.log(err));
}
// function checkUser() {
// 	Auth.currentAuthenticatedUser()
// 		.then(() => {
// 			console.log(true);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// }
async function checkUser() {
	const user = await Auth.currentAuthenticatedUser();
	console.log(user);
}

function useComponentVisible(initialIsVisible) {
	const [ isComponentVisible, setIsComponentVisible ] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
}

function Nav(props) {
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	// console.log(props);
	return (
		<Navbar>
			<div className="Nav-menus">
				<div className="Nav-brand">
					<Link className="Nav-brand-logo" to="/">
						Fyrozine
					</Link>
					<div id="menuToggle" className={isComponentVisible ? 'navOpen' : ''} ref={ref}>
						<input onClick={() => setIsComponentVisible(!isComponentVisible)} type="checkbox" />
						<span />
						<span style={{ width: '25px' }} />
						<span />
						<ul id="menu">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/male">Gentlemen</Link>
							</li>
							<li>
								<Link to="/female">Ladies</Link>
							</li>
							<li>
								<Link to="/kids">Kids</Link>
							</li>
							<li>
								<Link to="/your/closet">Your Closet</Link>
							</li>
							<li>
								<Link to="/your/collection">Your Collections</Link>
							</li>
							{/* <li>
								<a href="/your/profile">Your Profile</a>
							</li> */}
							{/* <li>
								<a href="#">About Us</a>
							</li> */}
							{/* <li>
								<a onClick={checkUser}>Check User</a>
							</li> */}
							<li>
								<a onClick={() => signOut(props)}>Sign Out</a>
							</li>
							{props.deferredPrompt && (
								<li>
									<marquee>
										<a onClick={() => props.deferredPrompt.prompt()}>Add to home screen</a>
									</marquee>
								</li>
							)}
							<li style={{ marginTop: '10vh' }}>
								<a href="#" style={{ paddingRight: '10px' }}>
									<FontAwesomeIcon icon={[ 'fab', 'twitter' ]} transform="grow-5 down-5" size="1x" />
								</a>
								<a href="https://fb.me/fyrozine" style={{ paddingRight: '10px' }}>
									<FontAwesomeIcon icon={[ 'fab', 'facebook' ]} transform="grow-5 down-5" size="1x" />
								</a>
								<a href="https://www.instagram.com/fyrozine/" style={{ paddingRight: '10px' }}>
									<FontAwesomeIcon
										icon={[ 'fab', 'instagram' ]}
										transform="grow-5 down-5"
										size="1x"
									/>
								</a>
								<p style={{ fontSize: '12px' }}>fyrozine@gmail.com</p>
							</li>
						</ul>
					</div>
				</div>

				{/* <button >Sign Out</button>
				<button onClick={checkUser}></button> */}
			</div>
			{/* <nav role="navigation">
				<div id="menuToggle">
					<input type="checkbox" />
					<span />
					<span />
					<span />
					<ul id="menu">
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Info</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</div>
			</nav> */}
		</Navbar>
	);
}

export default withRouter(Nav);

const Navbar = styled.nav`
	background-color: #fff;
	/* border-bottom: 1px solid rgba(0, 0, 0, 0.0975); */
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0%);
	top: 0;
	width: 100%;
	max-width: ${viewW + 'px'};
	z-index: 6;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
	height: 50px;
	/* overflow: hidden; */

	.nav-menus {
		display: flex;
		flex-direction: row;
		height: 77px;
		width: 70%;
		margin: 0 auto;
		padding: 26px 40px;
	}
	.Nav-brand {
		display: flex;
	}
	.Nav-brand-logo {
		display: block;
		background-position: 30px 20px;
		background-image: url(${logo});
		background-size: 150px 32px;
		background-repeat: no-repeat;
		height: 49px;
		width: 200px;
		text-indent: -1000%;
		-webkit-tap-highlight-color: transparent;
	}

	#menuToggle {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 29px;
		right: 30px;
		z-index: 1;
		-webkit-user-select: none;
		user-select: none;
	}

	#menuToggle input {
		display: flex;
		width: 26px;
		height: 15px;
		position: absolute;
		cursor: pointer;
		opacity: 0;
		z-index: 2;
		-webkit-tap-highlight-color: transparent;
	}

	#menuToggle span {
		display: flex;
		width: 29px;
		height: 2px;
		margin-bottom: 5px;
		position: relative;
		background: #00000069;
		border-radius: 3px;
		z-index: 1;
		transform-origin: 5px 0px;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
			background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), opacity 0.55s ease;
	}

	#menuToggle span:first-child {
		transform-origin: 0% 0%;
	}

	#menuToggle span:nth-last-child(2) {
		transform-origin: 0% 100%;
	}

	#menuToggle.navOpen span {
		opacity: 1;
		transform: rotate(45deg) translate(10px, -1px);
		background: #36383f;
	}
	#menuToggle.navOpen span:nth-last-child(3) {
		opacity: 0;
		transform: rotate(0deg) scale(0.2, 0.2);
	}

	#menuToggle.navOpen span:nth-last-child(2) {
		transform: rotate(-45deg) translate(3.5px, 9px);
	}

	#menu {
		position: absolute;
		width: 165px;
		height: 100vh;
		box-shadow: 0 0 10px #85888c;
		/* margin: -50px 0 0 -50px;  original*/
		border-right: 5px solid #ecba70db;
		border-radius: 0px 0px 0px 270px;
		margin: -50px 0 0 371px;
		padding: 50px;
		padding-top: 85px;
		background-color: #f5f6fa;
		-webkit-font-smoothing: antialiased;
		transform-origin: 0% 0%;
		transform: translate(-100%, 0);
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
	}

	#menu li {
		padding: 10px 0;
		transition-delay: 2s;
	}

	#menuToggle.navOpen ul {
		transform: translate(-215%, 0);
	}
	a {
		text-decoration: none;
		color: #1e1e23;
		opacity: 1;
		/* font-family: 'work sans', sans serif; */
		font-size: 1.25em;
		font-weight: 400;
		transition: 200ms;
	}
	a:hover {
		opacity: 0.5;
	}
	ul {
		padding: 0;
		list-style-type: none;
	}
`;
