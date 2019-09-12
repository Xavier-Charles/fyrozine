import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Products from './products';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateUser, updatePost } from '../graphql/mutations';

function ProductLister(props) {
	const [ Posts, updatePosts ] = useState({});
	const [ iter, updateIter ] = useState(1);
	// const [saved, updateSaved] = useState(false)
	// const zuser = props.user;
	useEffect(() => {
		// console.log(props.authedUser.savedProducts);
		listPosts(props.authedUser.savedProducts);
	}, []);

	// const handleScroll = (e) => {
	// 	let et = e.target;
	// 	let scrolled = et.scrollLeft / (et.scrollWidth - et.clientWidth);
	// 	if (scrolled > 0.5 && iter < 5) {
	// 		listPosts(props.data[`group_${iter}`]);
	// 		updateIter(iter + 1);
	// 	}
	// };

	// Query the API and save them to the state
	// const handleScroll = (e) => {
	//     let et = e.target;
	//     let scrolled = et.scrollLeft / (et.scrollWidth - et.clientWidth);
	//     if (scrolled > 0.5 && iter < 5) {
	//         listPosts(props.data[`group_${iter}`]);
	//         updateIter(iter + 1);
	//     }
	// };

	async function saveProduct(val) {
		// console.log(val);
		// console.log(zuser);

		let user = props.authedUser;
		let data = { price: val.price, img: val.img, link: val.link, part: val.part };
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

	async function delProduct(val) {
		// console.log(val);
		// console.log(props);
		let user = props.authedUser;
		// let data = { price: val.price, img: val.img, link: val.link };
		try {
			// console.log(user.savedProducts.length);
			user.savedProducts = user.savedProducts.filter((p) => p.link !== val.link);
			// console.log(user.savedProducts.length);
			await API.graphql(graphqlOperation(updateUser, { input: user }));
			// if (user.savedProducts == null) {
			// 	user.savedProducts = [data];
			// } else {
			// 	user.savedProducts.push(data);
			// }
			// console.log(user);
			// let s = await API.graphql(graphqlOperation(updateUser, { input: user }));
			// console.log(s);
		} catch (err) {
			console.log(err);
		}
	}

	async function listPosts(data) {
		try {
			let w = {};
			// console.log(props.data);
			// data &&
			//     Object.values(data).map((item, id) => {
			//         Object.values(item).map((val, id) => {
			//             P.push(val);
			//         });
			//     });
			// console.log(data);
			//* seperate the posts into groups of parts like torsowaist...
			data.map((e, id) => {
				if (w[e.part]) {
					w[e.part].push(e);
				} else {
					w[e.part] = [ e ];
				}
			});
			//*-----------------------------------
			if (data) {
				updatePosts((prevState) => {
					return { ...prevState, ...w };
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
	const postList = (loading, error, posts) => {
		// console.log('gotten');

		if (loading) return <p>Loading Posts...</p>;
		if (error) return <p>Error Fetching Posts...</p>;

		if (props.authedUser.savedProducts && props.authedUser.savedProducts.length !== 0) {
			return (
				<Styler>
					<div style={{ marginTop: 100 + 'px', textAlign: 'center' }}>
						{/* {console.log(Posts)} */}

						{Object.values(Posts).map((e, id) => {
							return (
								<div
									className="Products"
									style={{ marginTop: 15 + 'px', textAlign: 'center' }}
									key={id}
								>
									<div className="item">
										{e.map((val, i) => {
											return (
												<Products
													del={delProduct}
													save={saveProduct}
													val={val}
													key={i}
													closet={true}
												/>
											);
										})}
									</div>
								</div>
							);
						})}
						{/* {Posts.map((val, id) => {
								return (
									// <div key={id}>
									<Products del={delProduct} save={saveProduct} val={val} key={id} closet={true} />
									// </div>
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
							})} */}
					</div>
				</Styler>
			);
		} else {
			return (
				<div className="Posts" style={{ marginTop: 210 + 'px', textAlign: 'center' }}>
					{/* <p>There's no recent post here for now...</p> */}
					<p>Build a closet by saving </p>
					<p>posts you love</p>
				</div>
			);
		}
	};

	return <div>{postList()}</div>;
}

const Styler = styled.div`
	/* width: 66.7%; */

	.item {
		display: flex;
		align-items: center;
		border: 1px solid #e6e6e6;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	//* ------------ScrollBar css for non-mobile-----------*/
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
