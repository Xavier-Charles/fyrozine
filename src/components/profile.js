import React from 'react';
import styled from 'styled-components';
import Products from './products';

function Profiler(props) {
	// useEffect(() => {
	// 	// console.log(props.authedUser.savedProducts);
	// 	listPosts(props.authedUser.savedProducts);
	// }, []);
	return (
		<Styler>
			<div className="displayPic">{/* <img></img> */}</div>
			<div>
				<h1 className="header h1">Your Name</h1>
				{/*//* <p>Favourite Style Quote</p> */}
				<div className="fashionq">
					<p>
						"Style is something each of us already has, all we need to do is find it." —Diane von
						Furstenberg
					</p>
				</div>
				{/* <div class="location"></div> */}
				<div className="collection">
					<h2 className="header">Collections</h2>
					<div className="item">
						{/* {Object.values(Posts).map((e, id) => {
							return (
								<div
									className="Products"
									style={{ marginTop: 15 + 'px', textAlign: 'center' }}
									key={id}
								>
									<div className="item">
										{e.map((val, i) => {
											return <Products val={val} key={i} closet={true} />;
										})}
									</div>
								</div>
							);
						})} */}
					</div>
				</div>
				<div>
					<h2 className="header">Apparel</h2>
				</div>
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	.container {
		background: aliceblue;
		width: 100%;
		min-height: 51vh;
	}

	.header {
		font-size: 16px;
		font-family: Julius sans One;
		margin-left: 18px;
	}
	.h1 {
		font-size: 20px;
	}
	.displayPic {
		background: aliceblue;
		width: 100%;
		min-height: 51vh;
	}
	.fashionq {
		margin: 0 12px;
		p {
			font-size: 14px;
		}
	}
`;
export default Profiler;
