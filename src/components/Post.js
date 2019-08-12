import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../lib/fontAw';
import { Storage, API, graphqlOperation } from 'aws-amplify';

import { updateUser, updatePost } from '../graphql/mutations';
// import './posts.css';

const PostStyle = styled.div`
	border-radius: 3px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	margin-bottom: 2px;
	margin-left: 1%;
	margin-right: 1%;
	/* align-items: center; */

	.Post-user {
		display: flex;
		padding: 16px;
		align-items: center;
	}
	.Post-user-avatar {
		width: 30px;
		height: 30px;
	}
	.Post-user-avatar img {
		/* background-color: #efefef; */
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.Post-user-nickname {
		margin-left: 12px;
		font-family: 'Julius Sans One', sans-serif;
		font-weight: bold;
	}
	.Post-image-bg {
		background-color: #efefef;
		width: 100%;
		min-height: 150px;
	}
	.Post-image img {
		display: block;
		width: 100%;
	}
	.Post-caption {
		padding: 16px 16px;
		font-size: 13px;
	}
	.Post-caption strong {
		font-family: 'PT Sans', sans-serif;
		font-weight: bold;
	}
	.vjs-fade-out {
		display: none;
		visibility: hidden;
		opacity: 0;
	}
	.btn {
		display: inline-block;
		background-color: inherit;
		border: none;
		color: white;
		margin: 0px 16px;
		padding: 6px 4px;
		font-size: 16px;
		cursor: pointer;
		div {
			display: inline-block;
			color: saddlebrown;
			text-decoration: none;

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
			saved: false
		};
		this.fetchImage = this.fetchImage.bind(this);
	}
	componentDidMount() {
		// console.log(this.props.postData);
		this.fetchImage(this.props.postData.img);
		// console.log(this.props.cprops.authedUser);
		// if (this.props.postData.lovedBy.find((o) => o === this.props.cprops.authedUser)) {
		// 	this.setState({ liked: true });
		// 	console.log('liked');
		// }

		// console.log(this.props)
	}
	async fetchImage(key) {
		try {
			const imageData = await Storage.get(key, { level: 'protected' });
			// return this.setState(() => ({ imageData: imageData }));
			// this.setState();
			this.setState({
				loading: false
			});
			this.setState({
				imageData: imageData
			});
		} catch (err) {
			console.log('error: ', err);
		}
	}
	async handleClick(type) {
		const user = this.props.cprops.authedUser;
		// console.log(user);
		switch (type) {
			case 'LIKE':
				if (this.state.liked) {
					try {
						this.props.postData.loveCount--;
						// this.props.postData.lovedBy = this.props.postData.lovedBy.filter((o) => o !== user);
						if (user.liked == null) {
							throw 'Wierd but you never liked this...from post component';
						} else {
							user.liked = user.liked.filter((p) => p !== this.props.postData.id);
						}
						this.setState({ liked: false });

						await API.graphql(graphqlOperation(updateUser, { input: user }));
						await API.graphql(graphqlOperation(updatePost, { input: this.props.postData }));
					} catch (err) {
						console.log(err);
					}
				} else {
					try {
						this.props.postData.loveCount++;
						// this.props.postData.lovedBy.push(user);
						if (user.liked == null) {
							user.liked = [ this.props.postData.id ];
						} else {
							user.liked.push(this.props.postData.id);
						}
						this.setState({ liked: true });

						await API.graphql(graphqlOperation(updatePost, { input: this.props.postData }));
						await API.graphql(graphqlOperation(updateUser, { input: user }));
					} catch (err) {
						console.log(err);
					}
				}
				break;
			case 'SAVE':
				// console.log(this.props.postData);
				if (this.state.saved) {
					try {
						// this.props.postData.lovedBy = this.props.postData.lovedBy.filter((o) => o !== user);
						this.setState({ saved: false });

						await API.graphql(graphqlOperation(updatePost, { input: this.props.postData }));
					} catch (err) {
						console.log(err);
					}
				} else {
					try {
						// this.props.postData.lovedBy.push(user);
						if (user.saved == null) {
							user.saved = [ this.props.postData.id ];
						} else {
							user.saved.push(this.props.postData.id);
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
	render() {
		//? destructuring needed here
		const nickname = this.props.nickname;
		const avatar = this.props.avatar;
		const loveCount = this.props.postData.loveCount;
		const caption = this.props.postData.caption;
		const placeholderColor = '#efefef';

		return (
			<PostStyle>
				<header>
					<div className="Post-user">
						<div className="Post-user-avatar">
							<img src={avatar} alt={nickname} />
						</div>
						<div className="Post-user-nickname">
							<span>{nickname}</span>
						</div>
					</div>
				</header>
				<div className="Post-image">
					<div className="Post-image-bg">
						{/* <img alt={caption} src={this.state.imageData} /> */}
						{/* <Image
								source={source}
								resizeMode={'contain'}
								onLoad={this._onLoad} /> */}
						{this.state.loading ? (
							<div
								style={{
									backgroundColor: placeholderColor // get placeholder color some how soon
								}}
							/>
						) : (
							<img onContextMenu={(e) => e.preventDefault()} alt={caption} src={this.state.imageData} />
						)}
					</div>
				</div>
				<div>
					{/* set Up from */}
					{/* https://scotch.io/tutorials/using-font-awesome-5-with-react */}
					<div className="btn" onClick={() => this.handleClick('LIKE')}>
						<FontAwesomeIcon
							icon={[ 'fas', 'heart' ]}
							size="1x"
							transform="grow-5 down-5"
							style={{ color: 'red', paddingRight: '5px' }}
						/>
						<div>{loveCount} Love It!</div>
					</div>
					<div className="btn" onClick={() => this.handleClick('SAVE')}>
						<FontAwesomeIcon
							icon={[ 'fas', 'bookmark' ]}
							transform="grow-5 down-5"
							size="1x"
							style={{ color: 'blue', paddingRight: '5px' }}
						/>
						<div>Save It!</div>
					</div>
					<div className="btn" onClick={() => console.log('Awesome')}>
						<FontAwesomeIcon
							icon={[ 'fas', 'share' ]}
							// transform={{ rotate: 0 }}
							transform="grow-5 left-0 down-5"
							size="1x"
							style={{ color: 'green', paddingRight: '5px' }}
						/>
						<div>Share it!</div>
					</div>
				</div>
				<div className="Post-caption">
					<strong>{nickname}</strong> {caption}
				</div>
			</PostStyle>
		);
	}
}

export default Post;
