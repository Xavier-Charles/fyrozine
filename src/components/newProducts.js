import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Products from './products';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateUser, updatePost, deleteProduct } from '../graphql/mutations';

function ProductLister(props) {
	const [ Posts, updatePosts ] = useState([]);
	const [ iter, updateIter ] = useState(1);
	// const [saved, updateSaved] = useState(false)
	useEffect(() => {
		// console.log(props.data);
		listPosts(props.data['group_0']);
	}, []);

	// Query the API and save them to the state
	const handleScroll = (e) => {
		let et = e.target;
		let scrolled = et.scrollLeft / (et.scrollWidth - et.clientWidth);
		if (scrolled > 0.5 && iter < 5) {
			listPosts(props.data[`group_${iter}`]);
			updateIter(iter + 1);
		}
	};

	async function saveProduct(val) {
		// console.log(val);
		// console.log(props.user);
		let user = props.user;
		let data = { price: val.price, img: val.img, link: val.link, part: val.cat };
		// console.log(data);
		try {
			if (user.savedProducts == null) {
				user.savedProducts = [ data ];
			} else {
				user.savedProducts.unshift(data);
			}
			// console.log(user);
			let s = await API.graphql(graphqlOperation(updateUser, { input: user }));
			// console.log(s);
		} catch (err) {
			console.log(err);
		}
	}

	async function listPosts(data) {
		try {
			let P = [];
			// console.log(props.data);
			data &&
				Object.values(data).map((item, id) => {
					Object.values(item).map((val, id) => {
						P.push(val);
					});
				});
			updatePosts((prevState) => {
				return [ ...prevState, ...P ];
			});
		} catch (err) {
			console.log(err);
		}
	}
	const postList = (loading, error, posts) => {
		// console.log('gotten');

		if (loading) return <p>Loading Posts...</p>;
		if (error) return <p>Error Fetching Posts...</p>;

		return (
			<Styler>
				<div className="Products">
					{/* {console.log(Posts)} */}
					<div className="item" onScroll={handleScroll}>
						{Posts.map((val, id) => {
							return (
								<Products save={saveProduct} val={val} key={id} />
								// <div className="card" key={id}>
								// 	<a href={trackLink(val)}>
								// 		<img src={val.img} alt="..." />
								// 	</a>
								// 	<p>
								// 		<button onClick={() => saveProduct(val)}>save</button>
								// 		<a href={trackLink(val.link)}>
								// 			<span>&#8358;</span> {val.price}
								// 			<span style={{ color: '#f68b1e' }}>{'  '}on Jumia</span>
								// 		</a>
								// 	</p>
								// </div>
							);
						})}
					</div>
				</div>
			</Styler>
		);
	};

	return <div>{postList()}</div>;
}

const Styler = styled.div`
	width: 66.7%;

	.item {
		display: flex;
		align-items: center;
		border: 1px solid #e6e6e6;
		overflow-x: scroll;
		overflow-y: hidden;
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
