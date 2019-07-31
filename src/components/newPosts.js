import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';

import { listPosts as ListPosts } from '../graphql/queries';
import config from '../aws-exports';

import styled from 'styled-components';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function App() {
	const [ Posts, updatePosts ] = useState([]);
	useEffect(() => {
		listPosts();
	}, []);

	// Query the API and save them to the state
	async function listPosts() {
		const p = await API.graphql(graphqlOperation(ListPosts));
		updatePosts(p.data.listPosts.items);
	}
	const postList = (loading, error, posts) => {
		if (loading) return <p>Loading Posts...</p>;
		if (error) return <p>Error Fetching Posts...</p>;

		return (
			<div className="Posts" style={{ marginTop: 150 + 'px' }}>
				{this.props.posts.map((post) => (
					<Post
						// nickname={post.user.nickname}
						// avatar={post.user.avatar}
						image={post.image}
						caption={post.caption}
						key={post.id}
					/>
				))}
			</div>
		);
	};

	return (
		// <Styler>
		<div>{postList()}</div>
		// </Styler>
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

// import React from 'react';

// import Post from './Post';
// import { graphql } from 'react-apollo';
// import ListPosts from '../graphql/queries/listPosts';
// import NewPostSubscription from '../subscriptions/newPostSubscription';

// class Posts extends React.Component {
// 	componentWillMount() {
// 		this.props.subscribeToNewPosts();
// 		console.log(this.props.posts);
// 	}
// 	render() {
// 		const postList = (loading, error, posts) => {
// 			if (loading) return <p>Loading Posts...</p>;
// 			if (error) return <p>Error Fetching Posts...</p>;

// 			return (
// 				<div className="Posts" style={{ marginTop: 150 + 'px' }}>
// 					{this.props.posts.map((post) => (
// 						<Post
// 							// nickname={post.user.nickname}
// 							// avatar={post.user.avatar}
// 							image={post.image}
// 							caption={post.caption}
// 							key={post.id}
// 						/>
// 					))}
// 				</div>
// 			);
// 		};
// 		return (
// 			<div>
// 				{postList()}
// 			</div>
// 		);
// 	}
// }

// export default graphql(ListPosts, {
// 	options: {
// 		fetchPolicy: 'cache-and-network'
// 	},
// 	props: (props) => ({
// 		posts: props.data.listPosts ? props.data.listPosts.items : [],
// 		subscribeToNewPosts: (params) => {
// 			props.data.subscribeToMore({
// 				document: NewPostSubscription,
// 				updateQuery: (prev, { subscriptionData: { data: { onCreatePost } } }) => {
// 					return {
// 						...prev,
// 						listPosts: {
// 							__typename: 'PostConnection',
// 							items: [
// 								onCreatePost,
// 								...prev.listPosts.items.filter((post) => post.id !== onCreatePost.id)
// 							]
// 						}
// 					};
// 				}
// 			});
// 		}
// 	})
// })(Posts);
