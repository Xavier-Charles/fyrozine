import React from 'react';

import Post from './Post';
import { graphql } from 'react-apollo';
import ListPosts from '../graphql/queries/listPosts';
import NewPostSubscription from '../subscriptions/newPostSubscription';

class Posts extends React.Component {
	componentWillMount() {
		this.props.subscribeToNewPosts();
		console.log(this.props.posts);
	}
	render() {
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
			<div>
				{/* <div {...css(styles.container)}> */}
				{/* <h1>Posts</h1> */}
				{/* {this.props.posts.map((r, i) => (
					<div {...css(styles.post)} key={i}>
						<p {...css(styles.title)}>Post name: {r.name}</p>
						<div>
							<p {...css(styles.title)}>captions</p>
							{r.captions.map((caption, i2) => (
								<p key={i2} {...css(styles.subtitle)}>
									{caption}
								</p>
							))}
						</div>
						<div>
							<p {...css(styles.title)}>images</p>
							{r.images.map((image, i3) => (
								<p key={i3} {...css(styles.subtitle)}>
									{i3 + 1}. {image}
								</p>
							))}
						</div>
					</div>
				))} */}

				{/* {({ loading, error, posts }) => {
					if (loading) return <p>Loading Posts...</p>;
					if (error) return <p>Error Fetching Posts...</p>;
					console.log('we are');

					return (
						<div className="Posts">
							{posts.map((post) => (
								<Post
									nickname={post.user.nickname}
									avatar={post.user.avatar}
									image={post.image}
									caption={post.caption}
									key={post.id}
								/>
							))}
						</div>
					);
				}} */}
				{postList()}
			</div>
		);
	}
}

// const styles = {
// 	title: {
// 		fontSize: 16
// 	},
// 	subtitle: {
// 		fontSize: 14,
// 		color: 'rgba(0, 0, 0, .5)'
// 	},
// 	post: {
// 		boxShadow: '2px 2px 5px rgba(0, 0, 0, .2)',
// 		marginBottom: 7,
// 		padding: 14,
// 		border: '1px solid #ededed'
// 	},
// 	container: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		paddingLeft: 100,
// 		paddingRight: 100,
// 		textAlign: 'left'
// 	}
// };

export default graphql(ListPosts, {
	options: {
		fetchPolicy: 'cache-and-network'
	},
	props: (props) => ({
		posts: props.data.listPosts ? props.data.listPosts.items : [],
		subscribeToNewPosts: (params) => {
			props.data.subscribeToMore({
				document: NewPostSubscription,
				updateQuery: (prev, { subscriptionData: { data: { onCreatePost } } }) => {
					return {
						...prev,
						listPosts: {
							__typename: 'PostConnection',
							items: [
								onCreatePost,
								...prev.listPosts.items.filter((post) => post.id !== onCreatePost.id)
							]
						}
					};
				}
			});
		}
	})
})(Posts);
