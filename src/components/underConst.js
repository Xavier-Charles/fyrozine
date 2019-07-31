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
					<p>
						Looks like this road is closed, so there is not much to see here right now. You can come back at
						a later date to see how things are coming along.
					</p>
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
		font-family: Raleway, Open Sans, sans-serif;
	}

	#wrapper {
		max-width: 800px;
		width: 90%;
		height: 600px;
		padding: 2vw;
		position: absolute;
		margin: auto;
		margin-top: 55px;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.container img {
		max-width: 400px;
		margin: 0 auto;
	}

	.container h1 {
	}

	.container p {
		text-align: left;
	}

	.container a {
		color: inherit;
	}

	.container#error_500 {
		background-color: #eeeeee;
		color: #2f8e89;
	}

	.container#error_401 {
		background-color: #83d9c8;
		color: #965418;
	}

	.container#error_404 {
		background-color: #83d9c8;
		color: #386177;
	}

	.container#index {
		background-color: #eeeeee;
		color: #df245d;
	}
`;
