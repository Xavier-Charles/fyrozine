import React from 'react';
import styled from 'styled-components';

function PostSkton() {
	return (
		<Styler>
			<header />
			<div className="Post-card">
				<div className="Post-image">
					<div className="Post-image-bg">
						<div className="imagesk" />
					</div>
				</div>
				<div className="Post-details">
					<div>
						<div className="btn">
							<p className="inline" />
						</div>
						<button className=" btn-shine">
							<p className="inline" />
						</button>
					</div>
					<hr />
					<div className="Post-caption">
						<p className="inline" />
					</div>
				</div>
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	border-radius: 3px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	margin-bottom: 2px;
	margin-left: 1%;

	.Post-image {
		overflow-x: hidden;
	}
	.Post-image-bg {
		background-color: #efefef;
		width: 150%;
		min-height: 250px;
		.imagesk {
			width: 100%;
			min-height: 250px;
			background-image: linear-gradient(90deg, #efefef 0px, rgba(225, 225, 225, 0.8) 40px, #efefef 80px);
			animation: shine-avatar 2s infinite ease-out;
		}
	}
	.Post-image img {
		display: block;
		width: 100%;
	}
	.Post-caption {
		display: flex;
		padding: 2px 11px;
		align-items: flex-end;
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
		div {
			margin-bottom: -11px;
		}
	}
	.Post-card:hover .Post-details {
		height: 91px;
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
		cursor: pointer;
		div {
			display: inline-block;
			text-decoration: none;
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
		bottom: 51px;
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

		z-index: 0;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
		-webkit-tap-highlight-color: transparent;
	}
	.inline {
		align-self: center;
		width: 100px;
		height: 15px;
		margin-top: 6px;
		border-radius: 7px;
		padding: 0;
		z-index: 20;
		background-image: linear-gradient(
			90deg,
			rgba(242, 242, 242, 0.8) 0px,
			rgba(231, 231, 231, 0.9) 45px,
			rgba(242, 242, 242, 0.8) 90px
		);
		background-size: 600px;
		animation: shine-lines 2s infinite ease-out;
	}
	@keyframes shine-avatar {
		0% {
			background-position: 0px;
		}
		40%,
		100% {
			background-position: 437px;
		}
	}
	@keyframes shine-lines {
		0% {
			background-position: -100px;
		}
		40%,
		100% {
			background-position: 140px;
		}
	}
`;

export default PostSkton;
