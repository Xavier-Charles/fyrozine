import React, { useEffect, useState } from 'react';
// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';

import { listPosts as ListPosts } from '../graphql/queries';
import Post from './Post';
// import config from '../aws-exports';

// import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function Poster(props) {
	console.log('called func');
	const [ Posts, updatePosts ] = useState([]);
	// const [ postImg, updatePostImg ] = useState([]);
	useEffect(() => {
		listPosts();

		return () => {
			// window.removeEventListener('mousemove', () => { })
			console.log('unmounted');
		};
	}, []);

	// Query the API and save them to the state
	async function listPosts() {
		console.log('rendered');
		try {
			const p = await API.graphql(graphqlOperation(ListPosts));
			updatePosts(p.data.listPosts.items);
			// executed = false;
		} catch (err) {
			console.log(err);
		}
	}
	// async function fetchImage(key) {
	// 	try {
	// 		const imageData = await Storage.get(key, { level: 'protected' });
	// 		return imageData;
	// 	} catch (err) {
	// 		console.log('error: ', err);
	// 	}
	// }
	const postList = (loading, error, posts) => {
		console.log('gotten');

		if (loading) return <p>Loading Posts...</p>;
		if (error) return <p>Error Fetching Posts...</p>;

		return (
			<div className="Posts" style={{ marginTop: 150 + 'px' }}>
				{/* {this.props.posts.map((post) => (
					<Post
						// nickname={post.user.nickname}
						// avatar={post.user.avatar}
						image={post.image}
						caption={post.caption}
						key={post.id}
					/>
				))} */}
				{Posts.map((postData, id) => {
					console.log('called again');
					// fetchImage(postData.img)
					return (
						<Post
							// nickname={post.user.nickname}
							// avatar={post.user.avatar}
							cprops={props}
							postData={postData}
							// caption={postData.caption}
							key={id}
						/>
					);
				})}
			</div>
		);
	};

	return (
		// <Styler>
		<div>{postList()}</div>
		// </Styler>
	);
}

// const Styler = styled.div`
// 	.container {
// 		width: 400px;
// 		margin: 90px auto;
// 	}
// 	.fileInput {
// 		margin: 10px 0px;
// 	}
// 	.image {
// 		width: 400px;
// 	}
// 	.button {
// 		width: 200px;
// 		background-color: #ddd;
// 		cursor: pointer;
// 		height: 30px;
// 		margin: 0px 0px 8px;
// 	}
// `;

export default Poster;
