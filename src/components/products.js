import React, { useEffect, useState } from 'react';
//// import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';

// import { listPosts as ListPosts } from '../graphql/queries';
// import Post from './Post';
import styled from 'styled-components';

//? replace soon
import data from '../lib/pData.json';
//// import config from '../aws-exports';

//// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function ProductLister(props) {
	const [ Posts, updatePosts ] = useState([]);
	// const [ postImg, updatePostImg ] = useState([]);
	useEffect(() => {
		listPosts();
	}, []);

	// Query the API and save them to the state

	async function listPosts() {
		try {
			// const p = await API.graphql(graphqlOperation(ListPosts));
			// updatePosts(p.data.listPosts.items);
			// console.log(Data.keys());
			// updatePosts(Object.entries(props.data['group_0']));
			let P = [];
			Object.values(props.data['group_0']).map((item, id) => {
				Object.values(item).map((val, id) => {
					P.push(val);
				});
			});
			updatePosts(P);
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
			<Styler>
				<div className="Products" style={{ marginTop: 150 + 'px' }}>
					{/* {console.log(Posts)} */}
					<div className="item">
						{Posts.map((val, id) => {
							return (
								<a href={val.link} key={id}>
									<div className="card">
										<img src={val.img} alt="..." />
										<p>
											<span>&#8358;</span>
											{val.price}
											{'  '}
											<span style={{ color: '#f68b1e' }}>on Jumia</span>
										</p>
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</Styler>
		);
	};

	return (
		// <Styler>
		<div>{postList()}</div>
		// </Styler>
	);
}

const Styler = styled.div`
	/* @import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700"); */
	a {
		text-decoration: none;
		color: black;
	}
	/* body {
		font-family: Montserrat, sans-serif;
		background: rgba(255, 153, 255, 0) f;
		margin: 0;
		height: 100vh;
		display: grid;
		place-items: center;
		color: #505050;
	} */
	.item {
		display: flex;
		align-items: center;
		border: 1px solid #e6e6e6;
		overflow-x: scroll;
		overflow-y: hidden;
	}
	.card {
		background: #fff;
		box-shadow: 1px 1px 40px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		min-width: 220px;
		min-height: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		border-radius: 2px;
		box-sizing: border-box;
	}
	.card svg {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		border: solid 10px transparent;
		background-image: linear-gradient(#fff, #fff),
			linear-gradient(90deg, rgba(255, 96, 96, 0.149) 40%, rgba(136, 96, 255, 0.149) 100%);
		background-clip: padding-box, border-box;
		background-origin: padding-box, border-box;
		background-size: 100% 100%, 100% 100%;
		background-position: center center, center bottom;
		background-repeat: no-repeat;
		transition: 1s;
	}
	.card svg:hover {
		background-size: 100% 100%, 200% 200%;
	}
	.card svg path {
		fill: #505050;
	}
	.card p {
		margin: 0;
		padding: 1rem;
		font-size: 16px;
		font-family: 'Julius Sans One', sans-serif;
		align-self: flex-end;
	}
	.card img {
		min-height: 220px;
		min-width: 210px;
		background-color: #efefef;
	}
	.card .title {
		padding: 0.7rem 1rem;
		font-size: 14px;
		font-weight: 600;
		color: #9a9a9a;
	}
	.card .desc {
		padding: 1rem 1rem;
		order: 2;
		text-align: center;
	}
	.card .actions {
		display: flex;
	}
	.card .actions button {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		border: none;
		font-size: 16px;
		padding: 0.7rem 1rem;
		color: #707070;
		font-weight: 800;
	}
	.card .actions button i {
		font-size: 20px;
		margin-bottom: 5px;
		padding: 10px;
		border-radius: 50%;
	}
	.card .actions button i.fa-heart {
		color: #ff6060;
		background: rgba(255, 96, 96, 0.149);
	}
	.card .actions button i.fa-star {
		color: #8860ff;
		background: rgba(136, 96, 255, 0.149);
	}
	//* ------------ScrollBar css for non-mobile----------- */
	@media (min-width: 450px) {
		.item::-webkit-scrollbar-track {
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
			background-color: #f5f5f5;
			border-radius: 7px;
		}

		.item::-webkit-scrollbar {
			/* width: 60px; */
			height: 8px;
			background-color: #f5f5f5;
		}

		.item::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #fff;
			background: rgba(197, 196, 196, 0.94);
		}
	}
`;

export default ProductLister;
