import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
// import { withAuthenticator } from 'aws-amplify-react';

import { createPost as CreatePost } from '../graphql/mutations';
import { listPosts as ListPosts } from '../graphql/queries';
import config from '../aws-exports';

import styled from 'styled-components';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function App() {
	const [ File, updateFile ] = useState(null);
	const [ PostCaption, updatePostCaption ] = useState('');
	const [ postImg, updatePostImg ] = useState('');
	const [ PostLoveCount, updateLoveCount ] = useState(0);
	const [ PostTags, updatePostTags ] = useState('');
	const [ Posts, updatePosts ] = useState([]);
	useEffect(() => {
		listPosts();
	}, []);

	// Query the API and save them to the state
	async function listPosts() {
		const p = await API.graphql(graphqlOperation(ListPosts));
		updatePosts(p.data.listPosts.items);
	}

	function handleChange(event) {
		const { target: { value, files } } = event;
		const fileForUpload = files[0];
		updateFile(fileForUpload || value);
	}
	function handleFile(event) {
		const { target: { value, files } } = event;
		const fileForUpload = files[0];
		updateFile(fileForUpload || value);
	}
	// function updateTags() for better tagging

	async function fetchImage(key) {
		try {
			const imageData = await Storage.get(
				'postImages/4969df6b-9725-4038-99e1-bfbfee3b2c53tevriss_FYRO_style_1.jpg',
				{ level: 'protected' }
			);
			return updatePostImg(imageData);
		} catch (err) {
			console.log('error: ', err);
		}
	}
	// upload the image to S3 and then save it in the GraphQL API
	async function createPost() {
		if (File) {
			const user = await Auth.currentAuthenticatedUser();
			const { name: fileName, type: mimeType } = File;
			const key = `postImages/${uuid()}${fileName}`;
			const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
			let date = new Date();

			const inputData = {
				img: url,
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
					}
				});
				// .then(result => console.log(result))
				// .catch(err => console.log(err));
				// await Storage.put(key, File, {
				// 	level: 'protected',
				// 	contentType: mimeType,
				// 	progressCallback(progress) {
				// 		console.log(`Uploading... ${Math.floor(progress.loaded * 100 / progress.total)}%`);
				// 	}
				// });
				await API.graphql(graphqlOperation(CreatePost, { input: inputData }));
				console.log('Success');
			} catch (err) {
				console.log('error: ', err);
			}
			listPosts();
		} else {
			// print call a validation method...
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
					Post
				</button>

				{/* {Posts.map((p, i) => <img className="image" alt="" key={i} src={p.image} />)} */}
				{Posts.map((u, i) => {
					console.log(u);
					fetchImage(u.img);
					return (
						<div key={i}>
							<p className="">{u.caption}</p>
							<img src={postImg} style={{ width: 300 }} />
						</div>
					);
				})}
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

// export default withAuthenticator(App);
export default App;

// Schema
// type Post @model{
//     id: ID!
//     caption: String!
//     tags: [String!]
//     img: S3Object!
//     loveCount: Int
//     postedBy: User
// }
