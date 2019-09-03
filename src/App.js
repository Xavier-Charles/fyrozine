import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { API, graphqlOperation, Auth } from 'aws-amplify';

import { getUser } from './graphql/queries';

import NewPosts from './components/newPosts';
import AddPost from './components/AddPosts';
import Nav from './components/Nav';
import Images from './components/images';
import Products from './components/products';
import Users from './components/users';
// import LoginForms from './components/loginForms';
// import UnderConst from './components/underConst';
import AppliedRoute from './components/appliedRoute';
import Test from './components/test.js';
import Collection from './components/Collection'; //PSk ProductList Skeleton

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
			authedUser: null
		};
		this.changeAuth = this.changeAuth.bind(this);
	}

	async componentDidMount() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			// const s = await Auth.currentCredentials()
			this.changeAuth(true);
			this.setState({ userId: user.attributes.sub, isAuthing: false, authed: true });

			const zuser = await API.graphql(graphqlOperation(getUser, { id: this.state.userId }));
			this.setState({ authedUser: zuser.data.getUser });
			// console.log(s);
		} catch (e) {
			console.log(e);
			// if (e === 'not authenticated') {
			// 	// this.props.history.push('/signup');
			// 	// console.log(this.props);
			// }
			// console.log(navigator.onLine);
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

	render() {
		const childProps = {
			authed: this.state.authed,
			authedUser: this.state.authedUser,
			changeAuth: this.changeAuth,
			changeFed: this.changeFed
		};
		const SignUpContainer = () => (
			<div className="LoginContainer">
				<AppliedRoute path="/signup" exact component={Test} props={childProps} />
			</div>
		);
		const DefaultContainer = () => (
			<div>
				<div className="AppContainer">
					<Nav {...childProps} />
					{/* {console.log('called')} */}
					{/* <Route path="/test" component={Test} /> */}
					<Route
						path="/your/collection"
						exact
						render={() =>
							this.state.authed ? (
								// <AppliedRoute path="/your/collection" exact component={Collection} props={childProps} />
								<Collection {...childProps} />
							) : (
								<Redirect to="/signup" />
							)}
					/>

					{/* <Route
						exact
						path="/products"
						render={() => (this.state.authed ? <Products /> : <Redirect to="/signup" />)}
					/> */}
					<Route
						path="/"
						exact
						render={() => (this.state.authed ? <NewPosts {...childProps} /> : <Redirect to="/signup" />)}
					/>
					{/* <AppliedRoute path="/" exact component={NewPosts} props={childProps} /> */}

					<Route
						path="/123456098yfguifladdpost"
						render={() => (this.state.authed ? <AddPost {...childProps} /> : <Redirect to="/signup" />)}
					/>
					{/* <Route path="/images" render={() => (this.state.authed ? <Images /> : <Redirect to="/signup" />)} />
					<Route
						path="/users"
						render={(props) => (this.state.authed ? <Users /> : <Redirect to="/signup" />)}
					/> */}
				</div>
			</div>
		);
		if (this.state.offline)
			return (
				<div>
					<p> You're offline</p>
					{console.log(' offline')}
				</div>
			); //** offline handler */
		// if (!this.state.authed) {
		// 	return (
		// 		<Router>
		// 			<Switch>
		// 				<Redirect to="/signup" />
		// 			</Switch>
		// 		</Router>
		// 	);
		// }
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
								<Route
									path="/"
									exact
									render={() =>
										this.state.authed ? (
											this.state.authedUser && <Route component={DefaultContainer} />
										) : (
											<Redirect to="/signup" />
										)}
								/>
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
		background: #ffffff;
		height: 100vh;
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
