import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import Amplify from 'aws-amplify';

// import awsmobile from './appsync';
import config from './aws-exports';
import Fullloader from './placeholderComponents/Fullloader';

//*catch before install prompt */
var deferredPrompt;

window.addEventListener('beforeinstallprompt', function(e) {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	// e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;

	// showAddToHomeScreen();
	console.log(e);
});

//* for multiple Url's (fyrozine n localhost) cognito*/
var urlsIn = config.oauth.redirectSignIn.split(',');
var urlsOut = config.oauth.redirectSignOut.split(',');
const oauth = {
	domain: config.oauth.domain,
	scope: config.oauth.scope,
	redirectSignIn: config.oauth.redirectSignIn,
	redirectSignOut: config.oauth.redirectSignOut,
	responseType: config.oauth.responseType
};
var hasLocalhost = (hostname) =>
	Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
var hasHostname = (hostname) => Boolean(hostname.includes(window.location.hostname));
var isLocalhost = hasLocalhost(window.location.hostname);
if (isLocalhost) {
	urlsIn.forEach((e) => {
		if (hasLocalhost(e)) {
			oauth.redirectSignIn = e;
		}
	});
	urlsOut.forEach((e) => {
		if (hasLocalhost(e)) {
			oauth.redirectSignOut = e;
		}
	});
} else {
	urlsIn.forEach((e) => {
		if (hasHostname(e)) {
			oauth.redirectSignIn = e;
		}
	});
	urlsOut.forEach((e) => {
		if (hasHostname(e)) {
			oauth.redirectSignOut = e;
		}
	});
}
var configUpdate = config;
configUpdate.oauth = oauth;
Amplify.configure(configUpdate);
// Amplify.configure(config);

const client = new AWSAppSyncClient({
	url: config.aws_appsync_graphqlEndpoint,
	region: config.aws_appsync_region,
	auth: {
		type: config.aws_appsync_authenticationType,
		apiKey: config.aws_appsync_apiKey
	}
});

const WithProvider = () => (
	<ApolloProvider client={client}>
		<Rehydrated
			render={({ rehydrated }) =>
				rehydrated ? (
					<App deferredPrompt={deferredPrompt} />
				) : (
					// <div
					// 	className="Posts"
					// 	style={{ marginTop: '250px', textAlign: 'center', fontFamily: 'Julius Sans One' }}
					// >
					// 	<h1 style={{ color: '#635f55' }}>Fyrozine</h1>
					// 	<Loadin color="#040404" />
					// </div>
					<Fullloader />
				)}
		/>
	</ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register();
