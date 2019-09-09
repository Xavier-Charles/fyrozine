import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

export default async function Scrape(urls) {
	let credentials = await Auth.currentCredentials();
	const lambda = new Lambda({
		credentials: Auth.essentialCredentials(credentials),
		region: 'eu-central-1'
	});

	let pullParams = {
		// FunctionName: 'testPython',
		FunctionName: 'writeApparel',
		InvocationType: 'RequestResponse',
		// LogType: 'None',
		Payload: JSON.stringify(urls)
	};

	return new Promise((resolve) => {
		lambda.invoke(pullParams, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				resolve(JSON.parse(data.Payload));
			}
		});
	});
}

export async function getPrice(url) {
	let credentials = await Auth.currentCredentials();
	const lambda = new Lambda({
		credentials: Auth.essentialCredentials(credentials),
		region: 'eu-central-1'
	});

	let pullParams = {
		// FunctionName: 'testPython',
		FunctionName: 'checkPrice',
		InvocationType: 'RequestResponse',
		// LogType: 'None',
		Payload: JSON.stringify(url)
	};

	return new Promise((resolve) => {
		lambda.invoke(pullParams, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				resolve(JSON.parse(data.Payload));
			}
		});
	});
}
