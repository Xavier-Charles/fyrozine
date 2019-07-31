import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import Amplify from 'aws-amplify';

// import awsmobile from './appsync';
import config from './aws-exports';
Amplify.configure(config);

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
			render={({ rehydrated }) => (rehydrated ? <App /> : <strong>Your custom UI component here...</strong>)}
		/>
	</ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
