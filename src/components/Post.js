import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAw';
import { Storage, API, graphqlOperation } from 'aws-amplify';

import { getPost as GetPost } from '../graphql/queries';
import { updateUser, updatePost } from '../graphql/mutations';
import scrape from '../scraper/scraper';
import ProductLister from './newProducts';
import Skeleton from '../placeholderComponents/Pskeleton';
import PostSkton from '../placeholderComponents/Postsk';

const PostStyle = styled.div`
	border-radius: 3px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	margin-bottom: 2px;
	margin-left: 1%;
	margin-right: 1%;

	.Post-user {
		display: flex;
		padding: 16px;
		align-items: center;
	}
	.Post-user-avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.Post-user-nickname {
		margin: 0px 12px;
		font-family: 'Julius Sans One', sans-serif;
		font-weight: 600;
	}
	.Post-image {
		overflow-x: hidden;
	}
	.Post-image-bg {
		background-color: #efefef;
		width: 100%;
		min-height: 250px;
		.imagesk {
			width: 99vw;
			min-height: 250px;
			background-image: linear-gradient(90deg, #efefef 0px, rgba(225, 225, 225, 0.8) 40px, #efefef 80px);
			animation: shine-avatar 1s infinite ease-out;
		}
	}
	.Post-image img {
		display: block;
		width: 99vw;
	}
	.Post-caption {
		/* display: flex; */
		padding: 2px 11px;
		font-size: 13px;
		/* align-items: flex-end; */
	}

	.vjs-fade-out {
		display: none;
		visibility: hidden;
		opacity: 0;
	}
	.Post-details {
		position: relative;
		height: 40px;
		box-sizing: border-box;
		transition: 0.5s;
		overflow: hidden;
	}
	.Post-card:hover .Post-details {
		height: 120px;
	}
	.Post-details hr {
		border: 0;
		width: 95%;
		color: #efefef;
		height: 1px;
		background: linear-gradient(to left, #efefef, #a5a4a4e6, #efefef);
	}
	.btn {
		display: inline-block;
		background-color: inherit;
		border: none;
		color: white;
		margin: 0px 10px;
		padding: 6px 4px;
		font-size: 16px;
		cursor: pointer;
		/* div {
			display: inline-block;
			color: saddlebrown;
			text-decoration: none;
		} */

		label.l {
			margin-top: 6px;
			margin-left: 6px;
			color: black;
			position: absolute;
			cursor: pointer;
			font-family: 'Julius Sans One', sans-serif;
			font-weight: 600;
		}
	}

	.btn-shine:after {
		background: #38ef7d;
		content: "";
		height: 155px;
		left: -75px;
		opacity: .4;
		position: absolute;
		top: -50px;
		transform: rotate(35deg);
		transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
		width: 50px;
		z-index: -10;
	}
	.btn-shine:hover:after {
		left: 120%;
		transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
	}
	.btn-shine {
		position: absolute;
		margin: 0;
		padding: 5px 12px;
		height: 41px;
		width: 140px;
		bottom: 80px;
		right: 0px;
		outline: none;
		text-decoration: none;
		align-items: center;
		cursor: pointer;
		text-transform: uppercase;
		background-color: #ffffff;
		border: 1px solid rgba(197, 196, 196, 0.94);
		border-top: 0px solid transparent;
		border-radius: 2px;

		font-family: inherit;
		z-index: 0;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
		-webkit-tap-highlight-color: transparent;
	}
	.btn-shine span {
		color: #164ca7;
		font-size: 15px;
		font-weight: 500;
		letter-spacing: 0.7px;
		z-index: 20;
	}
	.hideImg img {
		transform: translate(-102%, 0px);
		transition: transform 1s cubic-bezier(0.77, 0.2, 0.05, 1.0);
	}
	@keyframes shine-avatar {
		0% {
			background-position: -32px;
		}
		40%,
		100% {
			background-position: 208px;
		}
	}
`;

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			imageData: null,
			liked: false,
			loveColor: '#c5c4c4f0',
			saved: false,
			pD: false,
			productdata: {},
			postData: {},
			deleted: false
		};
		this.fetchImage = this.fetchImage.bind(this);
	}
	componentDidMount() {
		// console.log('mounted');
		if (this.props.Pid) {
			// this.props.getData(this.props.Pid).then((res) => {
			// 	this.setState({ postData: res.data.getPost });
			// 	this.fetchImage(this.state.postData.img);
			// 	this.props.cprops.authedUser.saved.includes(this.state.postData.id) && this.setState({ saved: true });
			// });
		} else {
			// console.log(this.state.postData);
			this.setState({ postData: this.props.postData });
			this.fetchImage(this.props.postData.img, this.props.postData.postedBy);
			// console.log(this.props);
			this.props.cprops.authedUser.saved &&
				this.props.cprops.authedUser.saved.includes(this.props.postData.id) &&
				this.setState({ saved: true });
			// console.log(this.props.cprops.authedUser.saved.includes(this.props.postData.id));
		}
		// console.log(datar
	}
	componentWillUnmount() {
		// console.log('unmounted');
	}
	async fetchImage(key, owner) {
		try {
			const imageData = await Storage.get(key, {
				level: 'protected',
				identityId: owner
			});
			this.setState({
				loading: false,
				imageData: imageData
			});
		} catch (err) {
			console.log('error: ', err);
		}
	}
	async handleClick(type) {
		const user = this.props.cprops.authedUser;
		switch (type) {
			case 'LIKE':
				if (this.state.liked) {
					try {
						this.state.postData.loveCount--;
						this.setState({ loveColor: '#c5c4c4f0' });
						if (user.liked == null) {
							throw 'Wierd but you never liked this...from post component';
						} else {
							user.liked = user.liked.filter((p) => p !== this.state.postData.id);
						}
						this.setState({ liked: false });

						await API.graphql(graphqlOperation(updateUser, { input: user }));
						await API.graphql(graphqlOperation(updatePost, { input: this.state.postData }));
					} catch (err) {
						console.log(err);
					}
				} else {
					try {
						this.state.postData.loveCount++;
						//* '#ec0031f0' is a shade of pink close to red
						this.setState({ loveColor: '#ec0031f0' });
						if (user.liked == null) {
							user.liked = [ this.state.postData.id ];
						} else {
							user.liked.push(this.state.postData.id);
						}
						this.setState({ liked: true });

						await API.graphql(graphqlOperation(updatePost, { input: this.state.postData }));
						await API.graphql(graphqlOperation(updateUser, { input: user }));
					} catch (err) {
						console.log(err);
					}
				}
				break;
			case 'SAVE':
				if (this.state.saved) {
					try {
						this.setState({ saved: false });
						user.saved = user.saved.filter((p) => p !== this.state.postData.id);
						await API.graphql(graphqlOperation(updateUser, { input: user }));
					} catch (err) {
						console.log(err);
					}
				} else {
					try {
						if (user.saved == null) {
							user.saved = [ this.state.postData.id ];
						} else {
							user.saved.push(this.state.postData.id);
						}
						this.setState({ saved: true });
						await API.graphql(graphqlOperation(updateUser, { input: user }));
					} catch (err) {
						console.log(err);
					}
				}
				break;
			default:
				console.log({ error: 'error', msg: 'No type Specified' });
		}
	}
	async getProducts(group) {
		let links = {
			hairNeck: this.state.postData.hairNeck,
			torsoWaist: this.state.postData.torsoWaist,
			thighAnkle: this.state.postData.thighAnkle,
			ankleToe: this.state.postData.ankleToe,
			acessories: this.state.postData.acessories
		};
		console.log('Loading...');
		this.setState({
			pD: true
		});
		let pd = await scrape(links);
		this.setState({
			productdata: pd,
			pD: false
		});
		console.log('done');
	}
	// showProducts(kind) {
	// 	if (kind === 'sk') return <Skeleton />;
	// 	if (kind === 'skb') {
	// 		console.log('skb');
	// 		return <ProductLister data={this.state.productdata} />;
	// 	}
	// }
	async getData(postId) {
		try {
			const postData = await API.graphql(graphqlOperation(GetPost, { id: postId }));
			// console.log(postData);
			if (postData.data.getPost == null) {
				const user = this.props.cprops.authedUser;
				user.saved = user.saved.filter((p) => p !== postId);
				await API.graphql(graphqlOperation(updateUser, { input: user }));
				return this.setState({ deleted: true });
			}
			this.setState({ postData: postData.data.getPost });
			this.fetchImage(postData.data.getPost.img);
			this.props.cprops.authedUser.saved.includes(postData.data.getPost.id) && this.setState({ saved: true });
			// console.log(this.state.postData);
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		//? destructuring needed here
		const nickname = this.props.nickname;
		const avatar = this.props.avatar;
		// console.log(this.state.postData);

		if (this.state.deleted) return <PostSkton />;
		if (this.state.postData && Object.keys(this.state.postData).length === 0) {
			//1st foll null 2nd for empty object
			this.props.Pid && this.getData(this.props.Pid);
			return <PostSkton />;
		} else {
			const caption = this.state.postData.caption;
			return (
				<PostStyle>
					<header />
					<div className="Post-card">
						<div className="Post-image">
							<div className="Post-image-bg">
								{this.state.loading ? (
									<div className="imagesk" />
								) : (
									<img
										onContextMenu={(e) => e.preventDefault()}
										alt={caption}
										src={this.state.imageData}
									/>
								)}
								{this.state.pD && <Skeleton />}
								{Object.keys(this.state.productdata).length !== 0 && (
									<ProductLister user={this.props.cprops.authedUser} data={this.state.productdata} />
								)}
							</div>
						</div>
						<div className="Post-details">
							<div>
								{/* //* Icons set Up from
						//* https://scotch.io/tutorials/using-font-awesome-5-with-react */}
								<div className="btn" onClick={() => this.handleClick('SAVE')}>
									<FontAwesomeIcon
										icon={[ 'fas', 'bookmark' ]}
										transform="grow-5 down-5"
										size="1x"
										style={{
											color: `${this.state.saved ? 'rgba(0, 142, 109, 0.84)' : '#c5c4c4f0'}`,
											paddingRight: '5px'
										}}
									/>
									{/* <div /> */}
									<label className="l">{`${this.state.saved ? 'Saved' : 'Save'}`}</label>
								</div>
								<button className=" btn-shine" onClick={() => this.getProducts('dara')}>
									<span>Let's See</span>
								</button>
							</div>
							<hr />
							<div className="Post-caption">
								{/* <img className="Post-user-avatar" src={avatar} alt={nickname} /> */}
								<span className="Post-user-nickname">{nickname} NICKNAME</span>
								<p style={{ marginLeft: '12px', marginBottom: '5px' }}>{caption}</p>
							</div>
						</div>
					</div>
				</PostStyle>
			);
		}
	}
}

export default Post;
