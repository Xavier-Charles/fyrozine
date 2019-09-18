import React, { useState, useReducer, useEffect } from 'react';

// // import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import ls from 'local-storage';

import styled from 'styled-components';
import img from '../img/fyrozine_login_mobile.jpg';
import Loadin from '../placeholderComponents/Loadin';

const initialFormState = {
	username: '',
	password: '',
	confirmationCode: ''
};
const viewh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;

function reducer(state, action) {
	switch (action.type) {
		case 'updateFormState':
			return {
				...state,
				[action.e.target.name]: action.e.target.value
			};
		default:
			return state;
	}
}

// async function createUser() {
// 	if (!username) return alert('please enter a username');
// 	if (username) {
// 		const inputData = { username };
// 		try {
// 			// await Storage.put(key, file, {
// 			// 	contentType: mimeType
// 			// });
// 			await API.graphql(graphqlOperation(CreateUser, { input: inputData }));
// 			updateUsername('');
// 			console.log('successfully stored user data!');
// 		} catch (err) {
// 			console.log('error: ', err);
// 		}
// 	}
// }

async function signUp({ username, password }, updateFormType, updateErrMsg) {
	try {
		await Auth.signUp({
			username,
			password
		});
		console.log('sign up success!');
		// initialFormState.updateMessObj('success-msg', 'sign up success!');
		updateFormType('confirmSignUp');
	} catch (err) {
		console.log('error signing up..', err);
		initialFormState.updateLoader(false);
		return updateErrMsg(err.message);
	}
	initialFormState.updateLoader(false);
}

async function confirmSignUp({ username, confirmationCode }, updateFormType, updateErrMsg) {
	try {
		await Auth.confirmSignUp(username, confirmationCode);
		console.log('confirm sign up success!');
		updateFormType('signIn');
	} catch (err) {
		console.log('error signing up..', err);
		return updateErrMsg(err.message);
	}
	initialFormState.updateLoader(false);
}

async function signIn({ username, password }, props, updateErrMsg) {
	// initialFormState.updateMessObj('success-msg', 'sign in success!');
	try {
		await Auth.signIn(username, password);
		console.log('sign in success!');
		// initialFormState.updateMessObj('success-msg', 'sign in success!');
		// props.changeAuth(true);
		props.changeIsAuthing(true);
		initialFormState.updateLoader(false);
		props.history.push('/'); //! Something's broke here
	} catch (err) {
		console.log('error signing up..', err);
		initialFormState.updateLoader(false);
		switch (err.code) {
			case 'NotAuthorizedException':
				return updateErrMsg('Incorrect email or password.');
			case 'UnexpectedLambdaException':
				return updateErrMsg('Password cannot be empty');
			// case err == string == error signing up..Username cannot be empty
			case 'NetworkError':
				return updateErrMsg("Look's like you're offline");
			case 'UserNotFoundException':
				return updateErrMsg('This email is not associated with any account');
			case 'UsernameExistsException':
				return updateErrMsg(err.message);
			default:
				return updateErrMsg(err.message);
		}
	}

	// props.changeIsLoading(false);
}

export default function Form(props) {
	const [ formType, updateFormType ] = useState('home');
	const [ isLoading, updateisLoading ] = useState({ norm: false, Facebook: false, Google: false });
	const [ formState, updateFormState ] = useReducer(reducer, initialFormState);
	const [ curtain, updateCurtain ] = useState('none');
	const [ errMsg, updateErrMsg ] = useState('');
	// const [ test, updatetest ] = useState(false);
	const [ styleObj, updateStyleObj ] = useState({
		_s_one: 's_one_class',
		_s_two: 's_two_class',
		_left: '',
		_right: 'right_hover',
		_signin: 'signup-off',
		_signup: 'sign-up'
	});

	useEffect(() => {
		updateCurtain('curtain');
		// console.log('loaded');
		// hoisting up to global object to make the function acessible .... there is a better way 118
		initialFormState.updateLoader = (boolean) => {
			updateisLoading({ norm: boolean });
		};
	}, []);
	function clicked(hand) {
		updateCurtain('none');
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
		if (hand === 'off') {
			updateCurtain('curtain');
		}
	}
	function renderForm() {
		switch (formType) {
			case 'home':
				return (
					<div>
						<Home styleObj={styleObj} clicked={clicked} updateFormType={(e) => updateFormType(e)} />
					</div>
				);
			case 'signUp':
				return (
					<div>
						<SignUp
							signUp={() => signUp(formState, updateFormType, updateErrMsg)}
							isLoading={isLoading.norm}
							// updateErrMsg={updateErrMsg}
							updateFormState={(e) => updateFormState({ type: 'updateFormState', e })}
						/>
					</div>
				);
			case 'confirmSignUp':
				return (
					<div>
						<ConfirmSignUp
							confirmSignUp={() => confirmSignUp(formState, updateFormType, updateErrMsg)}
							isLoading={isLoading.norm}
							// updateErrMsg={updateErrMsg}
							updateFormState={(e) => updateFormState({ type: 'updateFormState', e })}
						/>
					</div>
				);
			case 'signIn':
				return (
					<div>
						<SignIn
							signIn={() => signIn(formState, props, updateErrMsg)}
							isLoading={isLoading.norm}
							updateFormState={(e) => updateFormState({ type: 'updateFormState', e })}
						/>
					</div>
				);
			default:
				return null;
		}
	}

	return (
		<Styler>
			<div className="container1">
				<div className={`top ${curtain}`} />
				<div className={`bottom ${curtain}`} />
				{/* <div className="center">
					<h2>Please Sign In</h2>
					<input type="email" placeholder="email" />
					<input type="password" placeholder="password" />
					<h2>&nbsp;</h2>
				</div> */}
				<div>
					<div style={{ marginTop: formType === 'home' ? '0px' : '21vh' }}>
						{formType !== 'home' &&
						errMsg && (
							<div className="notification">
								<div className="content">
									<div className="identifier" />
									<div className="text">
										<span>{errMsg}</span>
										<span
											style={{ float: 'right', color: '#fff' }}
											onClick={() => updateErrMsg('')}
										>
											X
										</span>
									</div>
								</div>
							</div>
						)}
						{renderForm(formState)}
					</div>

					{formType === 'signUp' && (
						<p className="footer">
							Already have an account?{' '}
							<span className="anchor" onClick={() => updateFormType('signIn')}>
								Sign In
							</span>
							<br />
						</p>
					)}
					{formType === 'signIn' && (
						<div className="footer">
							Need an account?{' '}
							<span className="anchor" onClick={() => updateFormType('signUp')}>
								Sign Up
							</span>
							<button
								className="button"
								style={{ background: '#4267b2' }}
								onClick={() => {
									Auth.federatedSignIn({ provider: 'Facebook', customState: 'fedFace' });
									updateisLoading({ Facebook: true });
									ls.set('fed', true);
									// props.changeFed(true);
								}}
							>
								{!isLoading.Facebook ? (
									<span>
										Sign In with <strong>Facebook</strong>
									</span>
								) : (
									<span>
										Signinig In
										<Loadin color="#fff" />
									</span>
								)}
								{/* {!isLoading.Facebook && } */}
								{/* {isLoading.Facebook && (
									<span>
										<Loadin color="#fff" />
									</span>
								)} */}
							</button>
							<button
								className="button"
								style={{ background: 'rgba(201, 200, 204, 0.77)', color: '#000' }}
								onClick={() => {
									Auth.federatedSignIn({ provider: 'Google', customState: 'fedGoog' });
									ls.set('fed', true);
									updateisLoading({ Google: true });
								}}
							>
								{!isLoading.Google ? (
									<span>
										Sign In with{'  '}
										<strong>
											<span style={{ color: '#5692f5', fontSize: '19px' }}>G</span>
											<span style={{ color: '#ea4335', fontSize: '19px' }}>o</span>
											<span style={{ color: '#fabb06', fontSize: '19px' }}>o</span>
											<span style={{ color: '#5692f5', fontSize: '19px' }}>g</span>
											<span style={{ color: '#34a853', fontSize: '19px' }}>l</span>
											<span style={{ color: '#ea4335', fontSize: '19px' }}>e</span>
										</strong>
									</span>
								) : (
									<span>
										Signinig In
										<Loadin color="#000" />
									</span>
								)}
								{/* {isLoading.Google && (
									<span>
										<Loadin color="#000" />
									</span>
								)} */}
							</button>
						</div>
					)}
					{/* <button
					className="button"
					onClick={() => {
						test ? updatetest(false) : updatetest(true);
					}}
				>
					ChangeTest
				</button> */}
				</div>
			</div>
		</Styler>
	);
}

function Home(props) {
	return (
		<div className="containerHome fadeIn">
			<div className="c1">
				<div className="c11">
					{/* <h1 className="mainhead">LET'S STYLE YOU !!</h1> */}
					{/* <p className="mainp">Let's style you up!!!</p> */}
				</div>
				<div
					id="left"
					className={props.styleObj._left}
					onClick={() => {
						props.clicked('left');
						setTimeout(() => {
							props.clicked('off');
							props.updateFormType('signIn');
						}, 500);
					}}
				>
					<h1 className={props.styleObj._s_one}>
						<span>SIGN</span>
						<span className="su">IN</span>
					</h1>
				</div>
				<div
					id="right"
					className={props.styleObj._right}
					onClick={() => {
						props.clicked('right');
						setTimeout(() => {
							props.clicked('off');
							props.updateFormType('signUp');
						}, 500);
					}}
				>
					<h1 className={props.styleObj._s_two}>
						<span>SIGN</span>
						<span className="su">UP</span>
					</h1>
				</div>
			</div>
		</div>
	);
}
function SignUp(props) {
	return (
		<div className={`container`}>
			<input
				type="email"
				name="username"
				onChange={(e) => {
					e.persist();
					props.updateFormState(e);
				}}
				className="input"
				placeholder="Email"
			/>
			<input
				type="password"
				name="password"
				onChange={(e) => {
					e.persist();
					props.updateFormState(e);
				}}
				className="input"
				placeholder="password"
			/>
			{/* <input
                name='email'
                onChange={e => { e.persist(); props.updateFormState(e) }}
                className="input"
                placeholder='email'
            /> */}
			{/* <button onClick={props.signUp} className="button">
				Sign Up
			</button> */}
			<button
				className="button"
				disabled={props.isLoading}
				onClick={() => {
					initialFormState.updateLoader(true);
					props.signUp();
				}}
			>
				{!props.isLoading ? 'Sign Up' : 'Signinig Up'}
				{props.isLoading && (
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				)}
			</button>
		</div>
	);
}

function SignIn(props) {
	return (
		<div className="container">
			<input
				type="email"
				name="username"
				onChange={(e) => {
					e.persist();
					props.updateFormState(e);
				}}
				className="input"
				placeholder="Email"
			/>
			<input
				type="password"
				name="password"
				onChange={(e) => {
					e.persist();
					props.updateFormState(e);
				}}
				className="input"
				placeholder="password"
			/>
			<button
				className="button"
				disabled={props.isLoading}
				onClick={() => {
					initialFormState.updateLoader(true);
					props.signIn();
				}}
			>
				{!props.isLoading ? 'Sign In' : 'Signing in'}
				{props.isLoading && (
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				)}
			</button>
		</div>
	);
}

function ConfirmSignUp(props) {
	return (
		<div className="container">
			<input
				name="confirmationCode"
				placeholder="Confirmation Code"
				onChange={(e) => {
					e.persist();
					props.updateFormState(e);
				}}
				className="input"
			/>
			{/* <button onClick={props.confirmSignUp} className="button">
				Confirm Sign Up
			</button> */}
			<button
				className="button"
				disabled={props.isLoading}
				onClick={() => {
					initialFormState.updateLoader(true);
					props.confirmSignUp();
				}}
			>
				{!props.isLoading ? 'Confirm Sign Up' : 'Confirming'}
				{props.isLoading && (
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				)}
			</button>
		</div>
	);
}

//* Coolors
let Indigo = '#540D6E';
let Eucalyptus = '#3BCEAC';
let ParadisePink = '#EE4266';
let SunGlow = '#FFD23F';

const Styler = styled.div`
	//* --------------Notifications----------- */
	.notification {
		position: relative;
		/* height: 35px; */
		min-width: 60%;
		background-color: #ecafa454;
		margin-top: -5%;
		/* margin-left: 50%;
		transform: translate(-50%, 0%); */
		transform-origin: right;
		/* -webkit-animation: notify 0.5s ease-in-out; */
		animation: notify 0.5s ease-in-out;
	}
	.notification .text {
		text-align: center;
		padding: 6px;
	}
	@keyframes notify {
		0% {
			transform: scaleX(0);
			color: transparent;
			border-radius: 50%;
		}
		25% {
			transform: scaleX(0.25);
			border-radius: 0%;
		}
		50% {
			transform: scaleX(0.5);
		}
		85% {
			transform: scaleX(0.95);
			/* border-radius: 50%; */
			color: transparent;
		}
		100% {
			transform: scaleX(1);
			color: inherit;
		}
	}

	//* --------------Intro anime----------- */
	//* Indigo : #540D6E
	//* Eucalyptus : #3BCEAC
	//* ParadisePink : #EE4266
	//* SunGlow : #FFD23F */

	/* @import url("https://fonts.googleapis.com/css?family=Raleway:400,700"); */
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	body {
		min-height: 100vh;
		font-family: 'Montserrat', sans-serif;
	}

	.container1 {
		position: absolute;
		width: 100%;
		height: 100%;
		max-width: ${viewh / 1.4 + 'px'};
		overflow: hidden;
	}

	/* .container1:hover .center,
	.container1:active .center {
		opacity: 1;
		transition-delay: 0.2s;
	} */

	.top:before,
	.top:after,
	.bottom:before,
	.bottom:after {
		content: '';
		display: block;
		position: absolute;
		width: 200vmax;
		height: 200vmax;
		top: 50%;
		left: 50%;
		margin-top: -100vmax;
		transform-origin: 0 50%;
		transition: all 0.8s cubic-bezier(0.445, 0.05, 0, 1);
		z-index: 10;
		opacity: 0.65;
		transition-delay: 0.3s;
	}

	.top:before {
		transform: rotate(9deg);
		background: ${ParadisePink};
	}
	.top:after {
		transform: rotate(171deg);
		background: ${SunGlow};
	}

	.bottom:before {
		transform: rotate(-9deg);
		background: ${Eucalyptus};
	}
	.bottom:after {
		transform: rotate(-171deg);
		background: ${Indigo};
	}

	.curtain.top:before,
	.curtain.top:after,
	.curtain.bottom:before,
	.curtain.bottom:after {
		margin-left: 300px;
		transform-origin: -300px 50%;
		transition-delay: 0s;
	}
	/* .center {
		position: absolute;
		width: 400px;
		height: 400px;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		opacity: 0;
		transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
		transition-delay: 0s;
		color: #333;
	} */
	/* .center input {
		width: 100%;
		padding: 15px;
		margin: 5px;
		border-radius: 1px;
		border: 1px solid #ccc;
		font-family: inherit;
	} */

	//* ------------form css----------------------*/
	.button {
		-webkit-appearance: none;
		background: linear-gradient(to right, #3745b5 0%, #e46569 32%, #60b8d4 64%, #ecaf81 100%);
		width: 250px;
		height: 45px;
		background-size: 500%;
		border: none;
		border-radius: 2px;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		color: #fff;
		cursor: pointer;
		font: 1.5em Montserrat, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-top: 15px;
		/* font-weight: 600; */
		font-size: 17px;
		letter-spacing: 0.05em;
		outline-color: transparent;
		-webkit-tap-highlight-color: transparent;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.button:hover {
		animation-name: gradient;
		-webkit-animation-name: gradient;
		animation-duration: 2s;
		-webkit-animation-duration: s;
		animation-iteration-count: 1;
		-webkit-animation-iteration-count: 1;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 100%;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.input {
		height: 45px;
		margin-top: 8px;
		width: 300px;
		max-width: 300px;
		padding: 0px 8px;
		font-size: 16px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		outline-color: transparent;
		background-color: none;
		/* border: none; */
		/* border-bottom: 2px solid rgba(0, 0, 0, .3); */
		border-radius: 1px;
		border: 1px solid #ccc;
		font-family: inherit;
	}
	/* .button {
		background: linear-gradient(0, #3745b5, #e46569);
		color: white;
		width: 223px;
		height: 45px;
		margin-top: 10px;
		font-weight: 600;
		font-size: 17px;
		cursor: pointer;
		border: none;
		outline-color: transparent;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		border-radius: 3px;
		box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
	} */
	.footer {
		margin-top: 20px;
		font-weight: 600;
		padding: 0px 0px;
		text-align: center;
		color: rgba(0, 0, 0, 0.6);
	}
	.anchor {
		color: #006bfc;
		cursor: pointer;
	}

	//* -------------Home----------------*/
	body {
		/* background: #faf3ec; */
		/* font-family: 'Roboto'; */
	}
	::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		/* color: #748194; */
	}
	::-moz-placeholder {
		/* Firefox 19+ */
		/* color: #748194; */
	}
	:-ms-input-placeholder {
		/* IE 10+ */
		/* color: #748194; */
	}
	:-moz-placeholder {
		/* Firefox 18- */
		/* color: #748194; */
	}
	.containerHome {
		position: absolute;
		width: 100%;
		height: 100%;
		max-width: ${viewh / 1.4 + 'px'};
		left: 50%;
		transform: translate(-50%, 0%);
	}
	.c1 {
		/* box-shadow: 0 0 10px grey; */
		background-color: white;
		width: 100%;
		height: 100%;
		display: inline-block;
	}

	.c11 {
		background-image: url(${img});
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-color: #f9a61afc;
		width: 100%;
		height: 80%;
		position: absolute;
		z-index: 4;
		border-radius: 0px 0px 450px 45px;
		/* border-radius: 118px 23px 450px 30px; */
	}
	//* --------------media query for iphoneX+----------- */
	@media only screen and (min-device-width: 375px) and (min-device-height: 812px) {
		.c11 {
			background-image: url(${img});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-color: #f9a61afc;
			width: 100%;
			height: 70%;
			position: absolute;
			z-index: 4;
			border-radius: 0px 0px 450px 45px;
		}
	}
	#left,
	#right {
		border-bottom: ${viewh + 'px'} solid white;
		display: inline-block;
		height: 0;
		position: relative;
		cursor: pointer;
		outline-color: transparent;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	#right {
		border-left: 40px solid transparent;
		width: calc(50% - 1px);
	}
	#left {
		border-right: 20px solid transparent;
		width: calc(50% - 1px);
	}

	.left_hover {
		filter: drop-shadow(1px 1px 2px #888);
		z-index: 1;
	}
	.right_hover {
		/* filter: drop-shadow(-1px -3px 3px #333); */
		filter: drop-shadow(-1px 1px 2px #888);
		z-index: 1;
	}
	.s_one_class {
		color: #748194;
		position: absolute;
		top: ${viewh * 0.8 + 'px'};
		margin-left: 40%;
		text-align: center;
	}
	.s_one_class span,
	.s_two_class span {
		display: block;
		font-weight: 500;
	}

	.s_two_class {
		color: #748194;
		position: absolute;
		top: ${viewh * 0.798 + 'px'};
		margin-left: 0%;
		text-align: center;
	}
	.su {
		font-size: 20px;
	}

	.pink {
		color: #333c48;
	}
	.mainhead {
		color: white;
		font-size: 24px;
		text-align: center;
		margin-top: 25px;
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
		outline-color: transparent;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
		outline-color: transparent;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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

	//* ----------loader css------------*/
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 14px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 10px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 6px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 6px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 26px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 45px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(19px, 0);
		}
	}
`;
