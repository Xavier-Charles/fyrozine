import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import img from '../img/fyrozine_login_mobile.jpg';

var viewh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;

export default function Test() {
	const [ styleObj, updateStyleObj ] = useState({
		_s_one: 's_one_class',
		_s_two: 's_two_class',
		_left: '',
		_right: 'right_hover',
		_signin: 'signup-off',
		_signup: 'sign-up'
	});
	const [ mounted, updateMounted ] = useState(false);
	useEffect(() => {
		updateMounted(true);
	}, []);
	function clicked(hand) {
		if (hand === 'right') {
			updateStyleObj({
				_s_one: 's_one_class',
				_s_two: 's_two_class pink',
				_left: '',
				_right: 'right_hover',
				_signin: 'signup-off',
				_signup: 'sign-up'
			});
		}
		if (hand === 'left') {
			updateStyleObj({
				_s_one: 's_one_class pink',
				_s_two: 's_two_class',
				_left: 'left_hover',
				_right: '',
				_signin: 'signin',
				_signup: 'signup-off'
			});
		}
	}

	return (
		<Styler>
			<div className={`container ${mounted ? 'fadeIn' : ''}`}>
				<div className="c1">
					<div className="c11">
						<h1 className="mainhead">LET'S STYLE YOU !!</h1>
						<div id="trapezoid" />
						{/* <p className="mainp">Let's style you up!!!</p> */}
					</div>
					<div id="left" className={styleObj._left} onClick={() => clicked('left')}>
						<h1 className={styleObj._s_one}>
							<span>SIGN</span>
							<span className="su">IN</span>
						</h1>
					</div>
					<div id="right" className={styleObj._right} onClick={() => clicked('right')}>
						<h1 className={styleObj._s_two}>
							<span>SIGN</span>
							<span className="su">UP</span>
						</h1>
					</div>
				</div>
				{/* <div className="c2">
					<form className={styleObj._signup}>
						<h1 className="signup1">SIGN UP</h1>
						<br />
						<br />
						<br />
						<br />
						<input name="username" type="text" placeholder="Username*" className="username" />

						<input name="email" type="text" placeholder="Email*" className="username" />

						<input name="password" type="password" placeholder="Password*" className="username" />

						<button className="btn">Sign Up</button>
					</form>
					<form className={styleObj._signin}>
						<h1 className="signup1">SIGN IN</h1>
						<br />
						<br />
						<br />
						<br />
						<input name="username" type="text" placeholder="Username*" className="username" />

						<input name="password" type="password" placeholder="Password*" className="username" />

						<button className="btn">Get Started</button>

						<br />
						<br />
						<br />
						<br />
						<a href="">
							<p className="signup2">Forget Password?</p>
						</a>
					</form>
				</div> */}
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	#trapezoid {
		border-bottom: 100px solid red;
		border-left: 25px solid transparent;
		border-right: 25px solid transparent;
		height: 0;
		width: 100px;
		transform: translateX(-151px);
		transition: transform 400ms ease-in;
	}
	#navbar {
		width: 220px;
		transform: translateX(-220px);
		transition: transform 400ms ease-in;
	}
	#trapezoid.slideIn {
		transform: translateX(0);
	}
	#trapezoid.slideOut {
		transform: translateX(-220px);
	}
	body {
		background: #faf3ec;
		font-family: 'Roboto';
	}
	::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		color: #748194;
	}
	::-moz-placeholder {
		/* Firefox 19+ */
		color: #748194;
	}
	:-ms-input-placeholder {
		/* IE 10+ */
		color: #748194;
	}
	:-moz-placeholder {
		/* Firefox 18- */
		color: #748194;
	}
	.container {
		position: absolute;
		width: 100%;
		max-width: ${viewh / 1.4 + 'px'};
		height: 100%;
		opacity: 0;
		transition: 0.7s opacity;
		/* center the child div */
		left: 50vw;
		transform: translate(-50%, 0%);
		/* border-radius: 15px 15px 15px 15px; */
	}
	.fadeIn {
		opacity: 1;
	}
	.c1 {
		box-shadow: 0 0 10px grey;
		background-color: white;
		width: 100%;
		height: 100%;
		display: inline-block;
		/* border-radius: 15px 15px 15px 15px; */
	}

	.c11 {
		background-image: url(${img});
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-color: white;
		width: 100%;
		height: 80%;
		position: absolute;
		z-index: 4;
		border-radius: 0px 0px 450px 75px;
	}
	#left,
	#right {
		border-bottom: ${viewh + 'px'} solid white;
		display: inline-block;
		height: 0;
		position: relative;
		cursor: pointer;
	}
	#right {
		border-left: 60px solid transparent;
		width: calc(50% - 63px);
	}
	#left {
		border-right: 30px solid transparent;
		width: calc(50% - 33px);
	}

	.left_hover {
		filter: drop-shadow(1px -3px 3px #333);
		z-index: 1;
	}
	.right_hover {
		filter: drop-shadow(-1px -3px 3px #333);
		z-index: 1;
	}
	.s_one_class {
		color: #748194;
		position: absolute;
		top: ${viewh * 0.8 + 'px'};
		margin-left: 35%;
	}
	.s_one_class span,
	.s_two_class span {
		display: block;
	}
	.su {
		font-size: 20px;
	}
	.s_two_class {
		color: #748194;
		position: absolute;
		top: ${viewh * 0.8 + 'px'};
		margin-left: -15%;
	}

	.pink {
		color: #fc74ac;
	}
	.mainhead {
		color: white;
		font-size: 24px;
		text-align: center;
		margin-top: 25px;
	}
	.mainp {
		color: white;
		font-size: 13px;
		text-align: center;
		margin-top: 10px;
	}
	.c2 {
		background-color: white;
		width: 300px;
		height: 500px;
		border-radius: 15px;
		position: absolute;
		left: 370px;
		display: inline-block;
	}
	.username {
		font-weight: bold;
		width: 200px;
		margin: 0 35px 20px;
		height: 35px;
		padding: 6px 15px;
		border-radius: 5px;
		outline: none;
		border: none;
		background: #f6f7f9;
		color: #748194;
		font-size: 14px;
	}
	.btn {
		font-weight: bold;
		width: 230px;
		margin: 0 35px 20px;
		height: 45px;
		padding: 6px 15px;
		border-radius: 5px;
		outline: none;
		border: none;
		background: #ee9ba3;
		color: white;
		font-size: 14px;
	}
	.signup1 {
		color: #748194;
		font-size: 30px;
		text-align: center;
	}
	a {
		text-decoration: none;
	}
	.signup2 {
		color: #748194;
		font-size: 20px;
		text-align: center;
	}
	.signup {
		display: initial;
	}
	.signup-off {
		display: none;
	}
	.signin {
		display: initial;
	}
	.signin-off {
		display: none;
	}
`;

// $(document).ready(function() {
// 	$('.container').fadeIn(1000);
// 	$('.s_two_class').css({ color: '#EE9BA3' });
// 	$('.s_one_class').css({ color: '#748194' });
// 	$('#left').removeClass('left_hover');
// 	$('#right').addClass('right_hover');
// 	$('.signin').css({ display: 'none' });
// 	$('.signup').css({ display: '' });
// });

// $('#right').click(function() {
// 	$('#left').removeClass('left_hover');
// 	$('.s_two_class').css({ color: '#EE9BA3' });
// 	$('.s_one_class').css({ color: '#748194' });
// 	$('#right').addClass('right_hover');
// 	$('.signin').css({ display: 'none' });
// 	$('.signup').css({ display: '' });
// });

// $('#left').click(function() {
// 	$('.s_one_class').css({ color: '#EE9BA3' });
// 	$('.s_two_class').css({ color: '#748194' });
// 	$('#right').removeClass('right_hover');
// 	$('#left').addClass('left_hover');
// 	$('.signup').css({ display: 'none' });
// 	$('.signin').css({ display: '' });
// });

// {
// 	_container: 'container or fadeIn';
// 	_s_one_class: 's_one_class or #s_one_class_pink';
// 	_s_two_class: 's_two_class or s_two_class_pink';
// 	_left: '"" or left_hover';
// 	_right: '"" or right_hover';
// 	_signin: 'none or "" ';
// 	_signup: '"" or none';
// }

// const Styler = styled.div`
// 	body {
// 		background: #faf3ec;
// 		font-family: 'Roboto';
// 	}
// 	::-webkit-input-placeholder {
// 		/* Chrome/Opera/Safari */
// 		color: #748194;
// 	}
// 	::-moz-placeholder {
// 		/* Firefox 19+ */
// 		color: #748194;
// 	}
// 	:-ms-input-placeholder {
// 		/* IE 10+ */
// 		color: #748194;
// 	}
// 	:-moz-placeholder {
// 		/* Firefox 18- */
// 		color: #748194;
// 	}
// 	.container {
// 		position: absolute;
// 		width: auto;
// 		height: auto;
// 		opacity: 0;
// 		transition: 2s opacity;
// 		top: calc(50% - 240px);
// 		left: calc(40% - 160px);
// 		border-radius: 15px 15px 15px 15px;
// 	}
// 	.fadeIn {
// 		opacity: 1;
// 	}
// 	.c1 {
// 		box-shadow: 0 0 10px grey;
// 		background-color: white;
// 		width: 300px;
// 		height: 500px;
// 		display: inline-block;
// 		border-radius: 15px 15px 15px 15px;
// 	}

// 	.c11 {
// 		background-image: url('https://i.pinimg.com/736x/b8/09/22/b80922f6ea2daaf36a6627378662803b--deck-of-cards-phone-wallpapers.jpg');
// 		background-size: 300px 400px;
// 		background-repeat: no-repeat;
// 		background-color: white;
// 		width: 300px;
// 		height: 400px;
// 		display: inline-block;
// 		position: absolute;
// 		z-index: 4;
// 		border-radius: 15px 15px 450px 75px;
// 	}
// 	#left,
// 	#right {
// 		color: white;
// 		display: inline-block;
// 		width: 146px;
// 		height: 500px;
// 		background-color: white;
// 		cursor: pointer;
// 	}
// 	#left {
// 		border-radius: 15px 0px 0px 15px;
// 	}
// 	#right {
// 		border-radius: 15px 15px 15px 0px;
// 	}
// 	.left_hover {
// 		color: #ee9ba3;
// 		box-shadow: 5px 0 18px -10px #333;
// 		z-index: 1;
// 		position: absolute;
// 	}
// 	.right_hover {
// 		box-shadow: -5px 0 15px -10px #333;
// 		z-index: 1;
// 		position: absolute;
// 	}
// 	.s_one_class {
// 		color: #748194;
// 		position: absolute;
// 		bottom: 0;
// 		left: 63%;
// 		margin-left: -50%;
// 	}
// 	.s_one_class_pink {
// 		color: #fc74ac;
// 		position: absolute;
// 		bottom: 0;
// 		left: 63%;
// 		margin-left: -50%;
// 	}
// 	.s_one_class span,
// 	.s_two_class span {
// 		display: block;
// 	}
// 	.su {
// 		font-size: 20px;
// 	}
// 	.s_two_class {
// 		color: #748194;
// 		position: absolute;
// 		bottom: 0;
// 		right: 63%;
// 		margin-right: -50%;
// 	}
// 	.s_two_class_pink {
// 		color: #fc74ac;
// 		position: absolute;
// 		bottom: 0;
// 		right: 63%;
// 		margin-right: -50%;
// 	}
// 	.mainhead {
// 		color: white;
// 		font-size: 24px;
// 		text-align: center;
// 		margin-top: 50px;
// 	}
// 	.mainp {
// 		color: white;
// 		font-size: 13px;
// 		text-align: center;
// 		margin-top: 10px;
// 	}
// 	.c2 {
// 		background-color: white;
// 		width: 300px;
// 		height: 500px;
// 		border-radius: 15px;
// 		position: absolute;
// 		left: 370px;
// 		display: inline-block;
// 	}
// 	.username {
// 		font-weight: bold;
// 		width: 200px;
// 		margin: 0 35px 20px;
// 		height: 35px;
// 		padding: 6px 15px;
// 		border-radius: 5px;
// 		outline: none;
// 		border: none;
// 		background: #f6f7f9;
// 		color: #748194;
// 		font-size: 14px;
// 	}
// 	.btn {
// 		font-weight: bold;
// 		width: 230px;
// 		margin: 0 35px 20px;
// 		height: 45px;
// 		padding: 6px 15px;
// 		border-radius: 5px;
// 		outline: none;
// 		border: none;
// 		background: #ee9ba3;
// 		color: white;
// 		font-size: 14px;
// 	}
// 	.signup1 {
// 		color: #748194;
// 		font-size: 30px;
// 		text-align: center;
// 	}
// 	a {
// 		text-decoration: none;
// 	}
// 	.signup2 {
// 		color: #748194;
// 		font-size: 20px;
// 		text-align: center;
// 	}
// 	.signup {
// 		display: initial;
// 	}
// 	.signup-off {
// 		display: none;
// 	}
// 	.signin {
// 		display: initial;
// 	}
// 	.signin-off {
// 		display: none;
// 	}
// `;
