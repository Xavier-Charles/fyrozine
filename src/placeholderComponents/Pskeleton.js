import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Skeleton(props) {
	// useEffect(() => {
	// 	console.log(props);
	// }, []);

	return (
		<Styler>
			{/* <div className="container"> */}
			<div className="item">
				<div className="card">
					<div className="imagesk" />
					<p className="inline" />
				</div>
				<div className="card">
					<div className="imagesk" />
					<p className="inline" />
				</div>
				<div className="card">
					<div className="imagesk" />
					<p className="inline" />
				</div>
			</div>
			{/* </div> */}
		</Styler>
	);
}

const Styler = styled.div`
	/* .container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	} */
	transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
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
	.card p.inline {
		align-self: flex-end;
		width: 140px;
		height: 16px;
		margin-top: 12px;
		border-radius: 7px;
		padding: 0;
		background-image: linear-gradient(
			90deg,
			rgba(242, 242, 242, 0.8) 0px,
			rgba(231, 231, 231, 0.9) 45px,
			rgba(242, 242, 242, 0.8) 90px
		);
		background-size: 600px;
		animation: shine-lines 2s infinite ease-out;
	}
	.card .imagesk {
		min-height: 220px;
		min-width: 210px;
		border-radius: 4%;
		background-image: linear-gradient(90deg, #efefef 0px, rgba(225, 225, 225, 0.8) 40px, #efefef 80px);
		background-size: 600px;
		animation: shine-avatar 2s infinite ease-out;
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
	@keyframes shine-lines {
		0% {
			background-position: -100px;
		}
		40%,
		100% {
			background-position: 140px;
		}
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

export default Skeleton;
