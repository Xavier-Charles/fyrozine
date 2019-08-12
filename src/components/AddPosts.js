import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid/v4';

import { createPost as CreatePost } from '../graphql/mutations';
// import { listPosts as ListPosts } from '../graphql/queries';
// import config from '../aws-exports';

import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function App() {
	const [ File, updateFile ] = useState(null);
	const [ PostCaption, updatePostCaption ] = useState('');
	// const [ postImg, updatePostImg ] = useState('');
	const [ PostTags, updatePostTags ] = useState('');
	//todo loading state to disable input when creating post
	// const [ Posts, updatePosts ] = useState([]);
	useEffect(() => {}, []);

	// Query the API and save them to the state
	// async function listPosts() {
	// 	const p = await API.graphql(graphqlOperation(ListPosts));
	// 	updatePosts(p.data.listPosts.items);
	// }

	// function handleChange(event) {
	// 	const { target: { value, files } } = event;
	// 	const fileForUpload = files[0];
	// 	updateFile(fileForUpload || value);
	// }
	function handleFile(event) {
		const { target: { value, files } } = event;
		const fileForUpload = files[0];
		updateFile(fileForUpload || value);
		console.log(fileForUpload);
	}
	// todo function updateTags() for better tagging

	// upload the image to S3 and then save it in the GraphQL API
	async function createPost() {
		if (File) {
			const user = await Auth.currentAuthenticatedUser(); //? Can we do this  or better
			const { name: fileName, type: mimeType } = File;
			const key = `postImages/${uuid()}${fileName}`;
			let date = new Date();

			const inputData = {
				img: key,
				postedBy: user.attributes.sub,
				tags: PostTags,
				caption: PostCaption,
				loveCount: 0,
				createdDate: date.toISOString()
			};

			try {
				await Storage.put(key, File, {
					level: 'protected',
					contentType: mimeType,
					progressCallback(progress) {
						console.log(`Uploading... ${Math.floor(progress.loaded * 100 / progress.total)}%`);
						//todo create upload bar for better uploading
					}
				});
				await API.graphql(graphqlOperation(CreatePost, { input: inputData }));
				console.log('Success');
			} catch (err) {
				console.log('error: ', err);
			}
		} else {
			//TODO print call a validation method...
		}
	}

	return (
		<Styler>
			<div className="container">
				<input type="file" onChange={handleFile} className="fileInput" />
				{/* <input placeholder="Image Name" value={ProductName} onChange={(e) => updateProductName(e.target.value)} /> */}
				<div>
					<label>Caption</label>
					<input
						placeholder="caption"
						value={PostCaption}
						onChange={(e) => updatePostCaption(e.target.value)}
					/>
				</div>
				<div>
					<label>Post Tags</label>
					<textarea
						placeholder="Tags eg. moccasin, high heels,..."
						value={PostTags}
						onChange={(e) => updatePostTags(e.target.value)}
					/>
				</div>
				<button className="button" onClick={createPost}>
					Create Post
				</button>
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	.container {
		width: 400px;
		margin: 90px auto;
	}
	.fileInput {
		margin: 10px 0px;
	}
	.image {
		width: 400px;
	}
	.button {
		width: 200px;
		background-color: #ddd;
		cursor: pointer;
		height: 30px;
		margin: 0px 0px 8px;
	}
`;

export default App;
