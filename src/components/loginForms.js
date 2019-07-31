import React, { useState, useReducer, useEffect } from 'react';

import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import styled from 'styled-components';
import img from '../img/fyrozine_login_mobile.jpg';
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

async function signUp({ username, password }, updateFormType) {
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
		return alert(err.message);
	}
	initialFormState.updateLoader(false);
}

async function confirmSignUp({ username, confirmationCode }, updateFormType) {
	try {
		await Auth.confirmSignUp(username, confirmationCode);
		console.log('confirm sign up success!');
		updateFormType('signIn');
	} catch (err) {
		console.log('error signing up..', err);
		return alert(err.message);
	}
	initialFormState.updateLoader(false);
}

async function signIn({ username, password }, props) {
	// initialFormState.updateMessObj('success-msg', 'sign in success!');
	try {
		await Auth.signIn(username, password);
		console.log('sign in success!');
		// initialFormState.updateMessObj('success-msg', 'sign in success!');
		props.changeAuth(true);
		initialFormState.updateLoader(false);
		props.history.push('/');
	} catch (err) {
		console.log('error signing up..', err);
		initialFormState.updateLoader(false);
		switch (err.code) {
			case 'NotAuthorizedException':
				return alert('Incorrect email or password.');
			case 'UnexpectedLambdaException':
				return alert('Password cannot be empty');
			// case err == string == error signing up..Username cannot be empty
			case 'NetworkError':
				return alert("Look's like you're offline");
			case 'UserNotFoundException':
				return alert('This email is not associated with any account');
			case 'UsernameExistsException':
				return alert(err.message);
			default:
				return alert(err.message);
		}
	}

	// props.changeIsLoading(false);
}

export default function Form(props) {
	const [ formType, updateFormType ] = useState('home');
	const [ isLoading, updateisLoading ] = useState({ norm: false, Facebook: false, Google: false });
	const [ formState, updateFormState ] = useReducer(reducer, initialFormState);
	// const [ mounted, updateMounted ] = useState(false);
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
		// hoisting up to global object to make the function acessible .... there is a better way 118
		initialFormState.updateLoader = (boolean) => {
			updateisLoading({ norm: boolean });
		};
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
							signUp={() => signUp(formState, updateFormType)}
							isLoading={isLoading.norm}
							updateFormState={(e) => updateFormState({ type: 'updateFormState', e })}
						/>
					</div>
				);
			case 'confirmSignUp':
				return (
					<div>
						<ConfirmSignUp
							confirmSignUp={() => confirmSignUp(formState, updateFormType)}
							isLoading={isLoading.norm}
							updateFormState={(e) => updateFormState({ type: 'updateFormState', e })}
						/>
					</div>
				);
			case 'signIn':
				return (
					<div>
						<SignIn
							signIn={() => signIn(formState, props)}
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
			<div>
				{renderForm(formState)}

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
					<p className="footer">
						Need an account?{' '}
						<span className="anchor" onClick={() => updateFormType('signUp')}>
							Sign Up
						</span>
						<button
							className="button"
							onClick={() => {
								Auth.federatedSignIn({ provider: 'Facebook' });
								updateisLoading({ Facebook: true });
							}}
						>
							{!isLoading.Facebook ? 'Sign In with Facebook' : 'Signinig In'}
							{isLoading.Facebook && (
								<div className="lds-ellipsis">
									<div />
									<div />
									<div />
									<div />
								</div>
							)}
						</button>
						<button
							className="button"
							onClick={() => {
								Auth.federatedSignIn({ provider: 'Google' });
								updateisLoading({ Google: true });
							}}
						>
							{!isLoading.Google ? 'Sign In with Google' : 'Signinig In'}
							{isLoading.Google && (
								<div className="lds-ellipsis">
									<div />
									<div />
									<div />
									<div />
								</div>
							)}
						</button>
					</p>
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
		</Styler>
	);
}

function Home(props) {
	return (
		<div className="containerHome fadeIn">
			<div className="c1">
				<div className="c11">
					<h1 className="mainhead">LET'S STYLE YOU !!</h1>
					{/* <p className="mainp">Let's style you up!!!</p> */}
				</div>
				<div
					id="left"
					className={props.styleObj._left}
					onClick={() => {
						props.clicked('left');
						props.updateFormType('signIn');
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
						props.updateFormType('signUp');
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

const Styler = styled.div`
	/* ------------form css--------- */
	.container {
		margin-top: 150px;
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
		outline: none;
		border: none;
		border-bottom: 2px solid rgba(0, 0, 0, .3);
	}
	.button {
		background-color: #006bfc;
		color: white;
		width: 316px;
		height: 45px;
		margin-top: 10px;
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
		border: none;
		outline: none;
		border-radius: 3px;
		box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
	}
	.footer {
		font-weight: 600;
		padding: 0px 25px;
		text-align: center;
		color: rgba(0, 0, 0, 0.6);
	}
	.anchor {
		color: #006bfc;
		cursor: pointer;
	}

	/* -------------new Form css---------------- */
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
		left: 50vw;
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
		width: calc(50% - 60px);
	}
	#left {
		border-right: 30px solid transparent;
		width: calc(50% - 30px);
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
		top: ${viewh * 0.798 + 'px'};
		margin-left: 5%;
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

	// ----------loader css------------
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
