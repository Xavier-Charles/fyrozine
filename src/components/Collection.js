import React, { useEffect, useState } from 'react';

import Post from './Post';

function Collection(props) {
	const postList = (loading, error, posts) => {
		// console.log('gotten');
		if (props.authedUser.saved.length !== 0) {
			if (loading) return <p>Loading Posts...</p>;
			if (error) return <p>Error Fetching Posts...</p>;

			return (
				<div className="Posts" style={{ marginTop: 150 + 'px' }}>
					{props.authedUser.saved.map((postId, id) => {
						// console.log('called again');
						return <Post cprops={props} key={id} Pid={postId} />;
					})}
				</div>
			);
		} else {
			console.log('no posts');

			return (
				<div className="Posts" style={{ marginTop: 150 + 'px', textAlign: 'center' }}>
					<p>No Saved Posts...</p>
				</div>
			);
		}
	};

	return <div>{postList()}</div>;
}

export default Collection;
