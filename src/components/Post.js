import React, { Component } from 'react';
import styled from 'styled-components';
// import './posts.css';

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
	}
	.Post-user-avatar img {
		/* background-color: #efefef; */
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.Post-user-nickname {
		margin-left: 12px;
		font-family: 'PT Sans', sans-serif;
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
`;

class Post extends Component {
	render() {
		const nickname = this.props.nickname;
		const avatar = this.props.avatar;
		const image = this.props.image;
		const caption = this.props.caption;

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
						<img alt={caption} src={image} />
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
