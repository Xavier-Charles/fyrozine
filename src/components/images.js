import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
import { withAuthenticator } from 'aws-amplify-react';

import { createProduct as CreateProduct } from '../graphql/mutations';
import { listProducts as ListProducts } from '../graphql/queries';
import config from '../aws-exports';

import styled from 'styled-components';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function App() {
	const [ file, updateFile ] = useState(null);
	const [ ProductName, updateProductName ] = useState('');
	const [ ProductPrice, updatePrice ] = useState(0);
	const [ ProductTags, updateProductTags ] = useState('');
	const [ Products, updateProducts ] = useState([]);
	useEffect(() => {
		listProducts();
	}, []);

	// Query the API and save them to the state
	async function listProducts() {
		const p = await API.graphql(graphqlOperation(ListProducts));
		updateProducts(p.data.listProducts.items);
	}

	function handleChange(event) {
		const { target: { value, files } } = event;
		const fileForUpload = files[0];
		updateProductName(fileForUpload.name.split('.')[0]);
		updateFile(fileForUpload || value);
	}
	// function updateTags() for better tagging

	// upload the image to S3 and then save it in the GraphQL API
	async function createProduct() {
		if (file) {
			const user = await Auth.currentAuthenticatedUser();
			const extension = file.name.split('.')[1];
			const { type: mimeType } = file;
			const key = `images/${uuid()}${ProductName}.${extension}`;
			const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
			const inputData = { image: url, owner: user.attributes.sub, tags: ProductTags, Price: ProductPrice };

			try {
				await Storage.put(key, file, {
					contentType: mimeType
				});
				await API.graphql(graphqlOperation(CreateProduct, { input: inputData }));
			} catch (err) {
				console.log('error: ', err);
			}
			listProducts();
		}
	}
	//
	//Need a product typee in schema differnt upload for product and styles.
	//
	// Schema::
	// type Image @model {
	// 	id: ID!
	// 	image: String!
	// 	Caption: String
	// 	username: String
	// 	description: String
	// }

	// type User @model {
	// 	id: ID!
	// 	username: String!
	// 	avatar: S3Object
	// }

	// type S3Object {
	// 	bucket: String!
	// 	region: String!
	// 	key: String!
	// }
	// type Products @model {
	// 	id: ID!
	// 	image: String!
	// 	owner: String!
	// 	tags: [String!]
	// 	Price: Int
	// }
	return (
		<Styler>
			<div className="container">
				<input type="file" onChange={handleChange} className="fileInput" />
				{/* <input placeholder="Image Name" value={ProductName} onChange={(e) => updateProductName(e.target.value)} /> */}
				<div>
					<label>Price</label>
					<input placeholder="Price" value={ProductPrice} onChange={(e) => updatePrice(e.target.value)} />
				</div>
				<div>
					<label>Product Tags</label>
					<textarea
						placeholder="Tags eg. moccasin, high heels,..."
						value={ProductTags}
						onChange={(e) => updateProductTags(e.target.value)}
					/>
				</div>
				<button className="button" onClick={createProduct}>
					Add Image
				</button>

				{Products.map((p, i) => <img className="image" alt="" key={i} src={p.image} />)}
			</div>
		</Styler>
	);
}

const Styler = styled.div`
	.container {
		width: 400px;
		margin: 90px auto;
	}
	.fileInput {
		margin: 10px 0px;
	}
	.image {
		width: 400px;
	}
	.button {
		width: 200px;
		background-color: #ddd;
		cursor: pointer;
		height: 30px;
		margin: 0px 0px 8px;
	}
`;

// export default withAuthenticator(App);
export default App;
