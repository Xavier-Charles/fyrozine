import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { getUser } from './graphql/queries';

import NewPosts from './components/newPosts';
import AddPost from './components/AddPosts';
import Nav from './components/Nav';
import Images from './components/images';
// import TestPost from './components/testPost';
import Products from './components/products';
import Users from './components/users';
import LoginForms from './components/loginForms';
import UnderConst from './components/underConst';
import AppliedRoute from './components/appliedRoute';
import Test from './components/test.js';

// function checkUser() {
// 	Auth.currentAuthenticatedUser()
// 		.then(() => {
// 			return true;
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return false;
// 		});
// }
var viewH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;
var viewW = viewH / 1.4;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: false,
			isAuthing: true,
			userId: '',
			authedUser: null
		};
		this.changeAuth = this.changeAuth.bind(this);
	}

	async componentDidMount() {
		try {
			// await Auth.currentSession();
			const user = await Auth.currentAuthenticatedUser();
			// console.log(user.attributes.sub);
			this.changeAuth(true);
			this.setState({ userId: user.attributes.sub });

			const zuser = await API.graphql(graphqlOperation(getUser, { id: this.state.userId }));
			this.setState({ authedUser: zuser.data.getUser });
			console.log(zuser.data.getUser);
		} catch (e) {
			// if (e !== 'No current user') {
			console.log(e);
			// }
		}
		this.setState({ isAuthing: false });
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
		const signUpContainer = () => (
			<div className="LoginContainer">
				{/* <Route exact path="/" render={() => <Redirect to="/signup" />} /> */}
				<AppliedRoute path="/signup" exact component={Test} props={childProps} />
			</div>
		);
		const DefaultContainer = () => (
			<div>
				{/* <Header toggleAlert={this.toggleAlert} /> */}
				<div className="AppContainer">
					<Nav {...childProps} />

					<Route path="/test" component={Test} />
					<Route path="/p" component={Products} />
					<Route
						exact
						path="/products"
						render={() => (this.state.authed ? <Products /> : <Redirect to="/signup" />)}
					/>
					<Route
						path="/post"
						render={() => (this.state.authed ? <NewPosts {...childProps} /> : <Redirect to="/signup" />)}
					/>
					<Route exact path="/" component={NewPosts} />
					{/* <Route path="/signup" render={() => <LoginForms authed={this.changeAuth} />} /> */}
					{/* <Route
						exact
						path="/"
						render={() => (this.state.authed ? <UnderConst /> : <Redirect to="/signup" />)}
					/> */}
					<Route
						path="/addpost"
						render={() => (this.state.authed ? <AddPost {...childProps} /> : <Redirect to="/signup" />)}
					/>
					<Route path="/images" render={() => (this.state.authed ? <Images /> : <Redirect to="/signup" />)} />
					<Route
						path="/users"
						render={(props) => (this.state.authed ? <Users /> : <Redirect to="/signup" />)}
					/>
					{/* Finally, catch all unmatched routes */}
					{/* <Route component={UnderConst} /> */}
				</div>
			</div>
		);
		return (
			!this.state.isAuthing && (
				<Styler>
					<div className="App">
						<Router>
							<Switch>
								<Route exact path="/signup" component={signUpContainer} />
								<Route component={DefaultContainer} />
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
		overflow: hidden;
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
