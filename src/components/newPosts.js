import React, { useEffect, useState } from 'react';
// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';

import { listNewPosts as ListPosts } from '../graphql/queries';
import Post from './Post';
import Loadin from '../placeholderComponents/Loadin';
// import config from '../aws-exports';

// import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function Poster(props) {
	// console.log('called Poster');
	const [ Posts, updatePosts ] = useState([]);
	const [ nextToken, updateNextToken ] = useState(null);
	const [ end, updateEnd ] = useState(false);
	const [ getting, updateGetting ] = useState(false);
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
		// console.log(scrolled);
		if (scrolled > 0.7 && !getting && !end) {
			// listPosts(props.data[`group_${iter}`]);
			// console.log('get');
			getMore();
			// updateIter(iter + 1);
		}
	};
	// async function GlistPosts() {
	// 	let isSubscribed = true;
	// 	try {
	// 		const p = await API.graphql(
	// 			graphqlOperation(ListPosts, {
	// 				filter: {
	// 					category: {
	// 						contains: props.sex
	// 					}
	// 				}
	// 			})
	// 		);

	// 		// console.log(isSubscribed);
	// 		// console.log(p);
	// 		if (isSubscribed) {
	// 			updatePosts(p.data.listPosts.items);
	// 		}
	// 		return () => (isSubscribed = false);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	async function listPosts() {
		let isSubscribed = true;
		try {
			let post = {};
			props.sex
				? (post.p = await API.graphql(
						graphqlOperation(ListPosts, {
							group: 'A',
							limit: 7,
							// sN: {
							// 	lt: '100'
							// },
							filter: {
								category: {
									contains: props.sex
								}
							}
						})
					))
				: (post.p = await API.graphql(
						graphqlOperation(ListPosts, {
							group: 'A',
							// sN: {
							// 	gt: '0'
							// },
							limit: 7
							// nextToken: 'next'
						})
					));
			// console.log(post.p.data.listPosts.nextToken);
			if (post.p.data.listNewPosts.nextToken === null) updateEnd(true);
			updateNextToken(post.p.data.listNewPosts.nextToken);

			// console.log(isSubscribed);
			if (isSubscribed) {
				updatePosts(post.p.data.listNewPosts.items);
			}

			return () => (isSubscribed = false);
		} catch (err) {
			console.log(err);
		}
	}
	async function getMore() {
		let isSubscribed = true;
		// const newData = await API.graphql(graphqlOperation(listUser, { nextToken }));
		if (!end) {
			try {
				let post = {};
				updateGetting(true);
				props.sex
					? (post.p = await API.graphql(
							graphqlOperation(ListPosts, {
								filter: {
									category: {
										contains: props.sex
									}
								},
								limit: 7,
								nextToken: nextToken
							})
						))
					: (post.p = await API.graphql(
							graphqlOperation(ListPosts, {
								limit: 7,
								nextToken: nextToken
							})
						));
				// console.log(post.p);
				updateNextToken(post.p.data.listNewPosts.nextToken);

				// console.log(isSubscribed);
				//* */ leaving getting as true at this point
				//* */ allows it to cancel all calls even if we scroll again
				if (isSubscribed) {
					// updatePosts([]);
					updatePosts((prevState) => {
						return [ ...prevState, ...post.p.data.listNewPosts.items ];
					});
				}
				if (post.p.data.listNewPosts.nextToken === null) return updateEnd(true);
				updateGetting(false);
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
					// display: 'flex',
					overflowY: 'scroll',
					height: 'calc(100vh - 75px)'
				}}
				onScroll={(e) => {
					e.persist();
					!end && handleScroll(e);
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
				{!end && (
					<div
						style={{
							margin: '10px 0',
							display: 'flex',
							justifyContent: 'center',
							marginTop: Posts.length === 0 ? '40vh' : 0
						}}
					>
						<Loadin color="#040404" />
					</div>
				)}
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
