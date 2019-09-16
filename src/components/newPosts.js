import React, { useEffect, useState } from 'react';
// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';

import { listPosts as ListPosts } from '../graphql/queries';
import Post from './Post';
// import config from '../aws-exports';

// import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function Poster(props) {
	// console.log('called Poster');
	const [ Posts, updatePosts ] = useState([]);
	const [ nextToken, updateNextToken ] = useState(null);
	const [ end, updateEnd ] = useState(false);
	// const [ value, error, pending ] = usePromise(listPosts, [], []);

	// const [ postImg, updatePostImg ] = useState([]);

	useEffect(() => {
		listPosts();
	}, []);

	// Query the API and save them to the state
	const handleScroll = (e) => {
		// console.log(et);
		let et = e.target;
		let scrolled = et.scrollTop / (et.scrollHeight - et.clientHeight);
		console.log(scrolled);
		// if (scrolled > 0.7) {
		// 	// listPosts(props.data[`group_${iter}`]);
		// 	getMore();
		// 	// updateIter(iter + 1);
		// }
	};
	async function listPosts() {
		let isSubscribed = true;
		try {
			// const p = await API.graphql(graphqlOperation(ListPosts));
			const p = await API.graphql(
				graphqlOperation(ListPosts, {
					limit: 2
					// nextToken: 'next'
				})
			);
			// console.log(p);
			updateNextToken(p.data.listPosts.nextToken);
			// console.log(isSubscribed);
			if (isSubscribed) {
				updatePosts(p.data.listPosts.items);
			}
			return () => (isSubscribed = false);
		} catch (err) {
			console.log(err);
		}
	}
	async function getMore() {
		let isSubscribed = true;
		// console.log('called');
		// const newData = await API.graphql(graphqlOperation(listUser, { nextToken }));
		if (!end) {
			try {
				// const p = await API.graphql(graphqlOperation(ListPosts));
				const p = await API.graphql(
					graphqlOperation(ListPosts, {
						limit: 1,
						nextToken: nextToken
					})
				);
				console.log(p);
				updateNextToken(p.data.listPosts.nextToken);

				// console.log(isSubscribed);
				if (p.data.listPosts.items.length === 0) return updateEnd(true);
				if (isSubscribed) {
					// updatePosts([]);
					updatePosts((prevState) => {
						return [ ...prevState, ...p.data.listPosts.items ];
					});
				}
				return () => (isSubscribed = false);
			} catch (err) {
				console.log(err);
			}
		}
	}

	const postList = (loading, error, posts) => {
		// console.log('gotten');

		if (loading) return <p>Loading Posts...</p>;
		if (error) return <p>Error Fetching Posts...</p>;

		return (
			<div
				className="Posts"
				style={{
					marginTop: 75 + 'px',
					display: 'flex',
					overflowY: 'scroll',
					height: 'calc(100vh - 75px)'
				}}
				onScroll={(e) => {
					e.persist();
					handleScroll(e);
				}}
			>
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
					// console.log('called again');
					// fetchImage(postData.img)
					return (
						<Post
							// nickname={post.user.nickname}
							// avatar={post.user.avatar}
							cprops={props}
							postData={postData}
							getMore={getMore}
							// caption={postData.caption}
							key={id}
						/>
					);
				})}
				{/* <button onClick={getMore}>Get more</button> */}
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
