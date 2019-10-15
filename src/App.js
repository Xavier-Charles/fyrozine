import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { API, graphqlOperation, Auth, Hub } from 'aws-amplify';

import { getUser } from './graphql/queries';
import ls from 'local-storage';

import NewPosts from './components/newPosts';
import AddPost from './components/AddPosts';
import Nav from './components/Nav';
// import Images from './components/images';
// import Products from './components/products';
// import Users from './components/users';
// import LoginForms from './components/loginForms';
// import UnderConst from './components/underConst';
// import Personal from './components/personalised';
import AppliedRoute from './components/appliedRoute';
// import Login from './components/login';
import Collection from './components/Collection'; //PSk ProductList Skeleton
import Closet from './components/AprlCollection';
import Profiler from './components/profile';

import Loadin from './placeholderComponents/Loadin';
import Fullloader from './placeholderComponents/Fullloader';

const LazyLogin = React.lazy(() => import('./components/login'));
const LazyNewPosts = React.lazy(() => import('./components/newPosts'));
const LazyAddPost = React.lazy(() => import('./components/AddPosts'));
const LazyNav = React.lazy(() => import('./components/Nav'));
const LazyAppliedRoute = React.lazy(() => import('./components/appliedRoute'));
const LazyCollection = React.lazy(() => import('./components/Collection'));
const LazyCloset = React.lazy(() => import('./components/AprlCollection'));
const LazyProfiler = React.lazy(() => import('./components/login'));
const LazyLoadin = React.lazy(() => import('./placeholderComponents/Loadin'));

var viewH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;
var viewW = viewH / 1.4;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: false,
			isAuthing: true,
			userId: '',
			offline: false,
			authedUser: null,
			fed: false,
			Nerror: false
		};
		this.changeAuth = this.changeAuth.bind(this);
		this.changeIsAuthing = this.changeIsAuthing.bind(this);
	}
	async update() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			// console.log(
			// 	user,
			// 	`temp1.username = "Facebook_1695900507220440", temp1.pool.clientId = "65b6518j4vl418rok653gt8ehm"`
			// );
			// const s = await Auth.currentCredentials()
			// console.log(user);
			const zuser = await API.graphql(graphqlOperation(getUser, { id: user.attributes.sub }));
			// this.changeAuth(true);
			this.setState({
				userId: user.attributes.sub,
				isAuthing: false,
				authed: true,
				authedUser: zuser.data.getUser,
				fed: false
			});
		} catch (e) {
			console.log(e);
			if (navigator.onLine && e.errors && e.errors[0].message === 'Network Error') {
				this.setState({ Nerror: true, offline: true });
			}
			// console.log(navigator.onLine, e.errors[0].message);
			this.setState({ isAuthing: false });
			if (!navigator.onLine && !this.state.authedUser) {
				this.setState({ offline: true });
			}
		}
	}
	async componentDidMount() {
		// console.log(navigator.onLine);
		// console.log('changed')
		// let z = await Hub.listen('auth');
		// console.log(z);
		//* 2 important comments below for debugging
		//ls.set('fed', false);
		// console.log(ls.get('fed'));
		try {
			if (ls.get('fed')) {
				// console.log('b');
				await Hub.listen('auth', ({ payload: { event, data } }) => {
					// switch (event) {
					// 	case "signIn":
					// 		this.setState({ user: data });
					// 		break;
					// 	case "signOut":
					// 		this.setState({ user: null });
					// 		break;
					// 	case "customOAuthState":
					// 		this.setState({ customState: data });
					// }
					// let z = true;
					// console.log(data);
					ls.set('fed', false);
					// console.log(event);
					this.update();
					// this.setState({ fed: true });
				});
				// console.log('sti');
				setTimeout(() => {
					if (ls.get('fed')) {
						ls.set('fed', false);
						this.setState({ isAuthing: false });
					}
				}, 10000);
				// console.log('finished');
				return;
			} else {
				// console.log(this.state.isAuthing);
				await Hub.listen('auth', ({ payload: { event, data } }) => {
					console.log(event);
					// console.log(data);
					if (event === 'signUp') return;
					!event.includes('failure') && this.update();
					// this.setState({ fed: true });
					return;
				});
				this.update();

				// const user = await Auth.currentAuthenticatedUser();
				// // console.log('red');
				// // 	user
				// // );
				// // const s = await Auth.currentCredentials()

				// // this.changeAuth(true);
				// this.setState({ userId: user.attributes.sub, isAuthing: false, authed: true });

				// const zuser = await API.graphql(graphqlOperation(getUser, { id: this.state.userId }));
				// // console.log(zuser);
				// this.setState({ authedUser: zuser.data.getUser });
			}
		} catch (e) {
			console.log(e);
			// if (e === 'not authenticated') {
			// 	// setTimeout(getUser, 1000);
			// }

			this.setState({ isAuthing: false });
			if (!navigator.onLine && !this.state.authedUser) {
				this.setState({ offline: true });
			}
		}
		// this.setState({ isAuthing: false });
	}
	changeAuth(boolean) {
		this.setState({ authed: boolean });
	}
	changeIsAuthing(boolean) {
		this.setState({ authed: boolean });
	}
	changeFed(boolean) {
		this.setState({ fed: boolean });
	}

	render() {
		const childProps = {
			authed: this.state.authed,
			authedUser: this.state.authedUser,
			changeAuth: this.changeAuth,
			changeFed: this.changeFed,
			changeIsAuthing: this.changeIsAuthing
		};
		const SignUpContainer = () => (
			<div className="LoginContainer">
				{/* {console.log('called')} */}
				<React.Suspense fallback={<Fullloader />}>
					<LazyAppliedRoute path="/signup" exact component={LazyLogin} props={childProps} />
				</React.Suspense>
			</div>
		);
		const DefaultContainer = () => (
			<div>
				<div className="AppContainer">
					<React.Suspense fallback={<Fullloader />}>
						<LazyNav {...childProps} deferredPrompt={this.props.deferredPrompt} />
						{/* {console.log('called')} */}
						{/* <Route path="/test" component={Login} /> */}
						<Route
							path="/your/collection"
							exact
							render={() =>
								this.state.authed ? (
									// <AppliedRoute path="/your/collection" exact component={Collection} props={childProps} />
									<LazyCollection {...childProps} />
								) : (
									<Redirect to="/signup" />
								)}
						/>
						<Route
							path="/male"
							exact
							render={() =>
								this.state.authed ? (
									// <AppliedRoute path="/your/collection" exact component={Collection} props={childProps} />
									<LazyNewPosts sex={'MALE'} {...childProps} />
								) : (
									<Redirect to="/signup" />
								)}
						/>
						<Route
							path="/female"
							exact
							render={() =>
								this.state.authed ? (
									// <AppliedRoute path="/your/collection" exact component={Collection} props={childProps} />
									<LazyNewPosts sex={'WOMEN'} {...childProps} />
								) : (
									<Redirect to="/signup" />
								)}
						/>
						{/* <Route
						path="/kids"
						exact
						render={() =>
							this.state.authed ? (
								// <AppliedRoute path="/your/collection" exact component={Collection} props={childProps} />
								<Personal sex={'KIDS'} {...childProps} />
							) : (
								<Redirect to="/signup" />
							)}
					/> */}
						<Route
							path="/your/closet"
							exact
							render={() =>
								this.state.authed ? <LazyCloset {...childProps} /> : <Redirect to="/signup" />}
						/>
						<Route
							path="/your/profile"
							exact
							render={() =>
								this.state.authed ? <LazyProfiler {...childProps} /> : <Redirect to="/signup" />}
						/>
						{/* <Route
						exact
						path="/products"
						render={() => (this.state.authed ? <Products /> : <Redirect to="/signup" />)}
					/> */}
						<Route
							path="/"
							exact
							render={() =>
								this.state.authed ? <LazyNewPosts {...childProps} /> : <Redirect to="/signup" />}
						/>
						{/* <AppliedRoute path="/" exact component={NewPosts} props={childProps} /> */}

						<Route
							path="/123456098yfguifladdpost"
							render={() =>
								this.state.authed ? <LazyAddPost {...childProps} /> : <Redirect to="/signup" />}
						/>
						{/* <Route path="/images" render={() => (this.state.authed ? <Images /> : <Redirect to="/signup" />)} />
					<Route
						path="/users"
						render={(props) => (this.state.authed ? <Users /> : <Redirect to="/signup" />)}
					/> */}
					</React.Suspense>
				</div>
			</div>
		);
		if (this.state.offline) {
			return (
				<div
					className="Posts"
					style={{ marginTop: '250px', textAlign: 'center', fontFamily: 'Julius Sans One' }}
				>
					<p> {this.state.Nerror ? 'Having trouble connecting' : "You're currently offline"}</p>
					{/* {console.log(this.state.offline, this.state.Nerror)} */}
				</div>
			);
		} //** offline handler */
		if (this.state.isAuthing) {
			return (
				// <div
				// 	className="Posts"
				// 	style={{ marginTop: '250px', textAlign: 'center', fontFamily: 'Julius Sans One' }}
				// >
				// 	<h1 style={{ color: '#635f55' }}>Fyrozine</h1>
				// 	<Loadin color="#040404" />
				// </div>
				<Fullloader />
			);
		}
		return (
			!this.state.isAuthing && (
				<Styler>
					{/* {console.log(this.state)} */}
					<div className="App">
						<Router>
							<Switch>
								{/* <Route
									path="*"
									exact
									render={() =>
										this.state.authed ? (
											this.state.authedUser && <Route component={DefaultContainer} />
										) : (
											<Redirect to="/signup" />
										)}
								/> */}
								<Route path="/signup" component={SignUpContainer} />
								{/* <Route
									path="/"
									exact
									render={() =>
										this.state.authed ? (
											this.state.authedUser && <Route component={DefaultContainer} />
										) : (
											<Redirect to="/signup" />
										)}
								/> */}
								{/* {!this.state.authedUser && <Route component={SignUpContainer} />} */}
								{/* {this.state.authedUser && <Route component={DefaultContainer} />} */}
								<Route
									render={() =>
										this.state.authed ? (
											this.state.authedUser && <Route component={DefaultContainer} />
										) : (
											<Redirect to="/signup" />
										)}
								/>
							</Switch>
						</Router>
					</div>
				</Styler>
			)
		);
	}
}

export default App;

const Styler = styled.div`
	.App {
		margin: 0 auto;
		width: 100%;
		max-width: ${viewW + 'px'};
		height: 100%;
	}
	body {
		background: red;
	}
	.AppContainer {
		position: relative;
		overflow-x: hidden;
		overflow-y: hidden;
		background: #ffffff;
		height: 100vh;
		/* display: flex; */
		/* min-height: 0; */
	}
	.LoginContainer {
		background: #ffffff;
	}
`;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
