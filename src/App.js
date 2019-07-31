import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

// import newPosts from './components/newPosts';
// import AddPost from './AddPosts';
import Nav from './components/Nav';
import Images from './components/images';
import TestPost from './components/testPost';
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
			isAuthing: true
		};
		this.changeAuth = this.changeAuth.bind(this);
	}
	async componentDidMount() {
		try {
			await Auth.currentSession();
			this.changeAuth(true);
		} catch (e) {
			if (e !== 'No current user') {
				console.log(e);
			}
		}
		this.setState({ isAuthing: false });
	}
	changeAuth(boolean) {
		this.setState({ authed: boolean });
	}

	render() {
		const childProps = {
			authed: this.state.authed,
			changeAuth: this.changeAuth,
			changeFed: this.changeFed
			// changeIsLoading: this.changeIsLoading,
			// isLoading: this.state.isLoading
		};
		return (
			!this.state.isAuthing && (
				<Styler>
					<div className="App">
						<Router>
							<div>
								{/* <button onClick={this.checkstate}>checkauth</button> */}
								{/* addconditional routing for nav on sign up */}
								<Nav {...childProps} />
								<Switch>
									<AppliedRoute path="/signup" exact component={LoginForms} props={childProps} />
									<Route path="/test" component={Test} />
									{/* <Route path="/post" component={newPosts} /> */}
									<Route path="/images" component={TestPost} />
									{/* <Route path="/signup" render={() => <LoginForms authed={this.changeAuth} />} /> */}
									<Route
										exact
										path="/"
										render={() => (this.state.authed ? <TestPost /> : <Redirect to="/signup" />)}
									/>
									{/* <Route path="/addpost" component={AddPost} /> */}
									<Route
										path="/images"
										render={() => (this.state.authed ? <Images /> : <Redirect to="/signup" />)}
									/>
									<Route
										path="/users"
										render={(props) => (this.state.authed ? <Users /> : <Redirect to="/signup" />)}
									/>
									{/* Finally, catch all unmatched routes */}
									<Route component={UnderConst} />
								</Switch>
							</div>
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
