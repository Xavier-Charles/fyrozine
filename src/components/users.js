import React, { useState, useReducer, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid/v4';
import { createUser as CreateUser } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';
import { onCreateUser } from '../graphql/subscriptions';
import config from '../aws-exports';

import styled from 'styled-components';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const initialState = {
	users: []
};

function reducer(state, action) {
	switch (action.type) {
		case 'SET_USERS':
			return { ...state, users: action.users };
		case 'ADD_USER':
			return { ...state, users: [ action.user, ...state.users ] };
		default:
			return state;
	}
}

function Users() {
	const [ file, updateFile ] = useState(null);
	const [ username, updateUsername ] = useState('');
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const [ avatarUrl, updateAvatarUrl ] = useState('');

	function handleChange(event) {
		const { target: { value, files } } = event;
		const [ image ] = files || [];
		updateFile(image || value);
	}

	async function fetchImage(key) {
		try {
			const imageData = await Storage.get(key);
			updateAvatarUrl(imageData);
		} catch (err) {
			console.log('error: ', err);
		}
	}

	async function fetchUsers() {
		try {
			let users = await API.graphql(graphqlOperation(listUsers));
			users = users.data.listUsers.items;
			dispatch({ type: 'SET_USERS', users });
		} catch (err) {
			console.log('error fetching users');
		}
	}

	async function createUser() {
		if (!username) return alert('please enter a username');
		if (file && username) {
			const { name: fileName, type: mimeType } = file;
			const key = `${uuid()}${fileName}`;
			const fileForUpload = {
				bucket,
				key,
				region
			};
			const inputData = { username, avatar: fileForUpload };

			try {
				await Storage.put(key, file, {
					contentType: mimeType
				});
				await API.graphql(graphqlOperation(CreateUser, { input: inputData }));
				updateUsername('');
				console.log('successfully stored user data!');
			} catch (err) {
				console.log('error: ', err);
			}
		}
	}
	useEffect(() => {
		fetchUsers();
		const subscription = API.graphql(graphqlOperation(onCreateUser)).subscribe({
			next: async (userData) => {
				const { onCreateUser } = userData.value.data;
				dispatch({ type: 'ADD_USER', user: onCreateUser });
			}
		});
		return () => subscription.unsubscribe();
	}, []);

	return (
		<Styler>
			<div className="container">
				<input className="fileInput" label="File to upload" type="file" onChange={handleChange} />
				<input placeholder="Username" value={username} onChange={(e) => updateUsername(e.target.value)} />
				<button className="button" onClick={createUser}>
					Save Image
				</button>
				{state.users.map((u, i) => {
					return (
						<div key={i}>
							<p className="username" onClick={() => fetchImage(u.avatar.key)}>
								{u.username}
							</p>
						</div>
					);
				})}
				<img src={avatarUrl} style={{ width: 300 }} />
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	.container {
		width: 300px;
		margin: 0px auto;
	}
	.username {
		cursor: pointer;
		border: 1px solid #ddd;
		padding: 5px 25px;
	}
	.button {
		width: 200px;
		background-color: #ddd;
		cursor: pointer;
		height: 30px;
		margin: 0px 0px 8px;
	}
	.fileInput {
		margin: 10px 0px;
	}
`;

export default withAuthenticator(Users, { includeGreetings: true });

// User Schema===
// type User {
// 	id: ID!
// 	name: String!
// 	email: String!
// 	Phone: String!
// 	location: String
// 	Liked: [Post]
// 	savedApparel: [Apparel]
// 	savedPost: [Post]
// 	avatar: String!
// }
