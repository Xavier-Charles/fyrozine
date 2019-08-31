import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid/v4';

import { createPost as CreatePost } from '../graphql/mutations';
// import { listPosts as ListPosts } from '../graphql/queries';
// import config from '../aws-exports';

import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function App() {
	const [ File, updateFile ] = useState(null);
	const [ PostCaption, updatePostCaption ] = useState('');

	const [ PostTags, updatePostTags ] = useState('');
	const [ hairNeck, updatehairNeck ] = useState('');
	const [ torsoWaist, updatetorsoWaist ] = useState('');
	const [ thighAnkle, updatethighAnkle ] = useState('');
	const [ ankleToe, updateankleToe ] = useState('');
	const [ acessories, updateacessories ] = useState('');
	const [ tags, updateTags ] = useState([]);
	const [ ApparelGroup, updateApparelGroup ] = useState({
		hairNeck: [],
		torsoWaist: [],
		thighAnkle: [],
		ankleToe: [],
		acessories: []
	});

	//todo loading state to disable input when creating post
	// const [ Posts, updatePosts ] = useState([]);
	useEffect(() => {}, []);

	// Query the API and save them to the state
	// async function listPosts() {
	// 	const p = await API.graphql(graphqlOperation(ListPosts));
	// 	updatePosts(p.data.listPosts.items);
	// }

	// function handleChange(event) {
	// 	const { target: { value, files } } = event;
	// 	const fileForUpload = files[0];
	// 	updateFile(fileForUpload || value);
	// }
	function handleFile(event) {
		const { target: { value, files } } = event;
		const fileForUpload = files[0];
		updateFile(fileForUpload || value);
		console.log(fileForUpload);
	}
	function enterHandler(event, type) {
		let i = ApparelGroup;
		switch (type) {
			case 'hairNeck':
				if (i.hairNeck.length === 0) {
					i.hairNeck.push(hairNeck);
					updateApparelGroup((prevState) => {
						return { ...prevState, hairNeck: i.hairNeck };
					});
					// updatehairNeck('');
				} else console.log('Limit exceeded');

				break;
			case 'torsoWaist':
				if (i.torsoWaist.length === 0) {
					i.torsoWaist.push(torsoWaist);
					updateApparelGroup((prevState) => {
						return { ...prevState, torsoWaist: i.torsoWaist };
					});
					// updatetorsoWaist('');
				} else console.log('Limit exceeded');
				break;
			case 'thighAnkle':
				if (i.thighAnkle.length === 0) {
					i.thighAnkle.push(thighAnkle);
					updateApparelGroup((prevState) => {
						return { ...prevState, thighAnkle: i.thighAnkle };
					});
					// updatethighAnkle('');
				} else console.log('Limit exceeded');
				break;
			case 'ankleToe':
				if (i.ankleToe.length === 0) {
					i.ankleToe.push(ankleToe);
					updateApparelGroup((prevState) => {
						return { ...prevState, ankleToe: i.ankleToe };
					});
					// updateankleToe('');
				} else console.log('Limit exceeded');
				break;
			case 'acessories':
				if (i.acessories.length === 0) {
					i.acessories.push(acessories);
					updateApparelGroup((prevState) => {
						return { ...prevState, acessories: i.acessories };
					});
					// updateacessories('');
				} else console.log('Limit exceeded');
				break;
			case 'tags':
				updateTags((prevState) => {
					return [ ...prevState, PostTags ];
				});
				updatePostTags('');
				break;
			default:
				console.log('error ', 'An undefined type was called in handle input');
		}
	}
	function deleteItem(item, type) {
		if (type === 'tags') {
			let t = tags.filter((i) => i !== item);
			updateTags(t);
			return;
		}
		let i = ApparelGroup;
		i[type] = i[type].filter((i) => i !== item);
		updateApparelGroup((prevState) => {
			return { ...prevState, type: i[type] };
		});
	}
	// todo function updateTags() for better tagging

	// upload the image to S3 and then save it in the GraphQL API
	async function createPost() {
		if (File) {
			const user = await Auth.currentAuthenticatedUser(); //? Can we do this better
			const { name: fileName, type: mimeType } = File;
			const key = `postImages/${uuid()}${fileName}`;
			let date = new Date();

			const inputData = {
				img: key,
				postedBy: user.attributes.sub,
				tags: tags,
				caption: PostCaption,
				loveCount: 0,
				createdDate: date.toISOString(),
				hairNeck: ApparelGroup.hairNeck,
				torsoWaist: ApparelGroup.torsoWaist,
				thighAnkle: ApparelGroup.thighAnkle,
				ankleToe: ApparelGroup.ankleToe,
				acessories: ApparelGroup.acessories

				// trackPrefix: 'http/co.jumisa.met'
			};

			try {
				await Storage.put(key, File, {
					level: 'protected',
					contentType: mimeType,
					progressCallback(progress) {
						console.log(`Uploading... ${Math.floor(progress.loaded * 100 / progress.total)}%`);
						//todo create upload bar for better uploading
					}
				});
				await API.graphql(graphqlOperation(CreatePost, { input: inputData }));
				console.log('Success');
			} catch (err) {
				console.log('error: ', err);
			}
			console.log(inputData);
		} else {
			//TODO print call a validation method...
		}
	}

	return (
		<Styler>
			<div className="container">
				<input type="file" onChange={handleFile} className="fileInput" />
				{/* <input placeholder="Image Name" value={ProductName} onChange={(e) => updateProductName(e.target.value)} /> */}
				<div>
					<label>Caption{'  '}</label>
					<input
						placeholder="caption"
						value={PostCaption}
						onChange={(e) => updatePostCaption(e.target.value)}
					/>
				</div>
				<br />
				<div>
					<div>
						<label>Post Tags</label>
						{tags.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'tags')}>delete</button>
							</p>
						))}
					</div>
					<input
						placeholder="Tags eg. moccasin, high heels,..."
						value={PostTags}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'tags');
						}}
						onChange={(e) => updatePostTags(e.target.value)}
					/>
				</div>
				<div>
					<h3>Apparel Group</h3>
					<p style={{ fontSize: '14px' }}>Press enter to add a new Tag</p>

					<div>
						<label className="label">
							<strong>hairNeck</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.hairNeck.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item}{' '}
									<button onClick={() => deleteItem(item, 'hairNeck')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={hairNeck}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'hairNeck');
							}}
							onChange={(e) => {
								updatehairNeck(e.target.value);
							}}
						/>
					</div>

					<div>
						<label className="label">
							<strong>torsoWaist</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.torsoWaist.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item}{' '}
									<button onClick={() => deleteItem(item, 'torsowaist')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={torsoWaist}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'torsoWaist');
							}}
							onChange={(e) => {
								updatetorsoWaist(e.target.value);
							}}
						/>
					</div>

					<div>
						<label className="label">
							<strong>thighAnkle</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.thighAnkle.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item}{' '}
									<button onClick={() => deleteItem(item, 'thighAnkle')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={thighAnkle}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'thighAnkle');
							}}
							onChange={(e) => {
								updatethighAnkle(e.target.value);
							}}
						/>
					</div>

					<div>
						<label className="label">
							<strong>ankleToe</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.ankleToe.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item}{' '}
									<button onClick={() => deleteItem(item, 'ankleToe')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={ankleToe}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'ankleToe');
							}}
							onChange={(e) => {
								updateankleToe(e.target.value);
							}}
						/>
					</div>

					<div>
						<label className="label">
							<strong>acessories</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.acessories.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item}{' '}
									<button onClick={() => deleteItem(item, 'acessories')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={acessories}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'acessories');
							}}
							onChange={(e) => {
								updateacessories(e.target.value);
							}}
						/>
					</div>
				</div>
				<button className="button" onClick={createPost}>
					Create Post
				</button>
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
	.listed {
		font-size: 12px;
	}
	.label {
		font-size: 14px;
		/* font-weight: bold; */
	}
	input {
		height: 24px;
		width: 80%;
	}
`;

export default App;
