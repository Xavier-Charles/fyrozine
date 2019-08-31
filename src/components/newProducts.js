import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ProductLister(props) {
	const [ Posts, updatePosts ] = useState([]);
	const [ iter, updateIter ] = useState(1);
	useEffect(() => {
		console.log(props.data);
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
		function trackLink(link) {
			if (link)
				return (
					'https://c.jumia.io/?a=173260&c=11&p=r&E=kkYNyk2M4sk%3D&ckmrdr=' +
					link.replace(/\//g, '%2F').replace(':', '%3A') +
					'&utm_campaign=173260&utm_term=fyro&s1=fyro'
				);
		}

		return (
			<Styler>
				<div className="Products">
					{/* {console.log(Posts)} */}
					<div className="item" onScroll={handleScroll}>
						{Posts.map((val, id) => {
							return (
								<a href={trackLink(val.link)} key={id}>
									<div className="card">
										<img src={val.img} alt="..." />
										<p>
											<span>&#8358;</span> {val.price}
											<span style={{ color: '#f68b1e' }}>{'  '}on Jumia</span>
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

	return <div>{postList()}</div>;
}

const Styler = styled.div`
	width: 66.7%;

	a {
		text-decoration: none;
		color: black;
	}
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
