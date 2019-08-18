import React from 'react';

import styled from 'styled-components';
import image from '../img/Lost.png';

const UnderConst = (props) => {
	return (
		<Styler>
			<div className="container" id="index">
				<div id="wrapper">
					<img src={image} alt="index" />
					<h1>This page may not exist or is under construction!</h1>
				</div>
			</div>
		</Styler>
	);
};

export default UnderConst;

const Styler = styled.div`
	html,
	body {
		margin: 0;
	}

	* {
		box-sizing: border-box;
	}

	.container {
		text-align: center;
		position: relative;
		height: 100vh;
		font-family: Montserrat, sans-serif;
		background-color: #eeeeee;
	}

	#wrapper {
		max-width: 800px;
		width: 90%;
		padding: 2vw;
		position: relative;
		margin: auto;
	}

	.container img {
		max-width: 275px;
		margin: 0 auto;
		margin-top: 40%;
	}

	.container h1 {
		color: #df245d;
	}
`;
