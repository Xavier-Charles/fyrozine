import React, { useEffect, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';

import Post from './Post';

var viewH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5;
var viewW = viewH / 1.4;
function Collection(props) {
	const postList = (loading, error, posts) => {
		// console.log('gotten');
		if (props.authedUser.saved && props.authedUser.saved.length !== 0) {
			if (loading) return <p>Loading Posts...</p>;
			if (error) return <p>Error Fetching Posts...</p>;

			return (
				<div
					className="Posts"
					style={{
						marginTop: 75 + 'px',
						overflowY: 'scroll',
						height: 'calc(100vh - 75px)'
					}}
				>
					{props.authedUser.saved.map((postId, id) => {
						// console.log('called again');
						return <Post cprops={props} key={id} Pid={postId} />;
					})}
				</div>
			);
		} else {
			// console.log('no posts');

			return (
				<div className="Posts" style={{ marginTop: 210 + 'px', textAlign: 'center' }}>
					{/* <p>There's no recent post here for now...</p> */}

					<p>Build a collection by saving </p>
					<p>posts you love</p>
				</div>
			);
		}
	};

	return <div>{postList()}</div>;
}

export default Collection;
