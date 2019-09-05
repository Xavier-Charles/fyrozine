import React from 'react';
import styled from 'styled-components';

export default function Loadin(props) {
	let color = props.color ? props.color : '#fff';
	return (
		<Styler>
			<div className="lds-ellipsis">
				<div style={{ background: color }} />
				<div style={{ background: color }} />
				<div style={{ background: color }} />
				<div style={{ background: color }} />
			</div>
		</Styler>
	);
}
const Styler = styled.div`
	display: contents;
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 14px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 10px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 6px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 6px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 26px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 45px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(19px, 0);
		}
	}
`;
