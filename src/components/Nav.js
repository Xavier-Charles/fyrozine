import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import styled from 'styled-components';
import logo from '../img/Fyr.png';

var viewH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;
var viewW = viewH / 1.4;

function signOut(props) {
	Auth.signOut()
		.then((data) => {
			// console.log(data);
			props.changeAuth(false);
			alert('Your logged out');
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
function Nav(props) {
	// console.log(props);
	return (
		<Navbar>
			<div className="Nav-menus">
				<div className="Nav-brand">
					<Link className="Nav-brand-logo" to="/">
						Fyrozine
					</Link>
				</div>
				<button onClick={() => Auth.federatedSignIn()}>federal Sign In</button>
				<button onClick={() => signOut(props)}>Sign Out</button>
				<button onClick={checkUser}>Check User</button>
			</div>
		</Navbar>
	);
}

export default withRouter(Nav);

const Navbar = styled.nav`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0%);
	top: 0;
	width: 101%;
	max-width: ${viewW + 'px'};
	z-index: 0;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
	height: 77px;

	.nav-menus {
		display: flex;
		flex-direction: row;
		height: 77px;
		width: 70%;
		margin: 0 auto;
		padding: 26px 40px;
	}

	.Nav-brand-logo {
		display: block;
		background-position: 40px 10px;
		background-image: url(${logo});
		background-size: 150px 70px;
		background-repeat: no-repeat;
		height: 70px;
		width: 200px;
		text-indent: -1000%;
	}
`;
