import React from 'react';
import Loadin from './Loadin';

export default function loader() {
	return (
		<div className="Posts" style={{ marginTop: '250px', textAlign: 'center', fontFamily: 'Julius Sans One' }}>
			<h1 style={{ color: '#635f55' }}>Fyrozine</h1>
			<Loadin color="#040404" />
		</div>
	);
}
