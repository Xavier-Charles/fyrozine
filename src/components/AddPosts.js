import React, { useEffect, useState } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid/v4';

import { createPost as CreatePost } from '../graphql/mutations';
// import { listPosts as ListPosts } from '../graphql/queries';
// import config from '../aws-exports';

import styled from 'styled-components';

// const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

function AddPost() {
	const [ File, updateFile ] = useState(null);
	const [ PostCaption, updatePostCaption ] = useState('');

	const [ PostTags, updatePostTags ] = useState('');
	const [ hairNeck, updatehairNeck ] = useState('');
	const [ torsoWaist, updatetorsoWaist ] = useState('');
	const [ thighAnkle, updatethighAnkle ] = useState('');
	const [ ankleToe, updateankleToe ] = useState('');
	const [ acessories, updateacessories ] = useState('');
	const [ Other1, updateOther1 ] = useState('');
	const [ Other2, updateOther2 ] = useState('');
	const [ Other3, updateOther3 ] = useState('');
	const [ category, updateCategory ] = useState('');
	const [ style, updateStyle ] = useState('');

	// const [ tags, updateTags ] = useState([]);
	const [ tags, updateTags ] = useState({
		attr: [],
		category: [],
		style: []
	});
	const [ ApparelGroup, updateApparelGroup ] = useState({
		hairNeck: [],
		torsoWaist: [],
		thighAnkle: [],
		ankleToe: [],
		acessories: [],
		Other1: [],
		Other2: [],
		Other3: []
		// category: []
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
		// let i = ApparelGroup;
		let t = tags;
		switch (type) {
			case 'hairNeck':
				// if (i.hairNeck.length === 0) {
				// 	i.hairNeck.push(hairNeck);
				// 	updateApparelGroup((prevState) => {
				// 		return { ...prevState, hairNeck: i.hairNeck };
				// 	});
				// 	// updatehairNeck('');
				// } else console.log('Limit exceeded');
				updateItem('hairNeck', hairNeck);
				break;
			case 'torsoWaist':
				// if (i.torsoWaist.length === 0) {
				// 	i.torsoWaist.push(torsoWaist);
				// 	updateApparelGroup((prevState) => {
				// 		return { ...prevState, torsoWaist: i.torsoWaist };
				// 	});
				// 	// updatetorsoWaist('');
				// } else console.log('Limit exceeded');
				updateItem('torsoWaist', torsoWaist);
				break;
			case 'thighAnkle':
				// if (i.thighAnkle.length === 0) {
				// 	i.thighAnkle.push(thighAnkle);
				// 	updateApparelGroup((prevState) => {
				// 		return { ...prevState, thighAnkle: i.thighAnkle };
				// 	});
				// 	// updatethighAnkle('');
				// } else console.log('Limit exceeded');
				updateItem('thighAnkle', thighAnkle);
				break;
			case 'ankleToe':
				// if (i.ankleToe.length === 0) {
				// 	i.ankleToe.push(ankleToe);
				// 	updateApparelGroup((prevState) => {
				// 		return { ...prevState, ankleToe: i.ankleToe };
				// 	});
				// 	// updateankleToe('');
				// } else console.log('Limit exceeded');
				// break;
				updateItem('ankleToe', ankleToe);
			case 'acessories':
				// if (i.acessories.length === 0) {
				// 	i.acessories.push(acessories);
				// 	updateApparelGroup((prevState) => {
				// 		return { ...prevState, acessories: i.acessories };
				// 	});
				// 	// updateacessories('');
				// } else console.log('Limit exceeded');
				updateItem('acessories', acessories);
				break;

			case 'Other1':
				updateItem('Other1', Other1);
				break;
			case 'Other2':
				updateItem('Other2', Other2);
				break;
			case 'Other3':
				updateItem('Other3', Other3);
				break;
			case 'tags_cat':
				// t.category = [ category ];
				// console.log([ category ]);
				updateTags((prevState) => {
					console.log(category);
					return { ...prevState, category: [ event.target.value ] };
				});
				// updatePostTags('');
				// console.log(tags);
				break;
			case 'tags_style':
				t.style.push(style);
				updateTags((prevState) => {
					return { ...prevState, style: t.style };
				});
				updateStyle('');
				break;
			case 'tags':
				t.attr.push(PostTags);
				updateTags((prevState) => {
					return { ...prevState, attr: t.attr };
				});
				updatePostTags('');
				break;
			default:
				console.log('error ', 'An undefined type was called in handle input');
		}
		// console.log(ApparelGroup);
	}
	function updateItem(group, val) {
		let i = ApparelGroup;
		if (i[group].length === 0) {
			// i[group].push(val);
			// console.log(val);
			updateApparelGroup((prevState) => {
				return { ...prevState, [group]: [ val ] };
			});
			// console.log(ApparelGroup);
		} else console.log('error ', 'Limit exceeded');
	}
	function deleteItem(item, type) {
		if (type === 'tags') {
			let t = tags.attr.filter((i) => i !== item);
			// console.log(t);
			// updateTags(t);
			updateTags((prevState) => {
				return { ...prevState, attr: t };
			});
			return;
		}
		if (type === 'tags_cat') {
			let t = tags.category.filter((i) => i !== item);
			// updateTags(t);
			updateTags((prevState) => {
				return { ...prevState, category: t };
			});
			return;
		}
		if (type === 'tags_style') {
			let t = tags.style.filter((i) => i !== item);
			// updateTags(t);
			updateTags((prevState) => {
				return { ...prevState, style: t };
			});
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
			const user = await Auth.currentCredentials(); //? Can we do this better
			// console.log(user);
			const { name: fileName, type: mimeType } = File;
			const key = `postImages/${uuid()}${fileName}`;
			let date = new Date();
			// * stringify arrays
			let ta = { cat: '', sty: '', attr: '' };
			tags.attr.map((e, i) => {
				ta.attr = ta.attr + e + ', ';
			});
			tags.style.map((e, i) => {
				ta.sty = ta.sty + e + ', ';
			});
			tags.category.map((e, i) => {
				ta.cat = ta.cat + e + ', ';
			});

			const inputData = {
				img: key,
				postedBy: user._identityId,
				tags: ta.attr,
				category: ta.cat,
				style: ta.sty,
				caption: PostCaption,
				// loveCount: 0,
				createdDate: date.toISOString(),
				hairNeck: ApparelGroup.hairNeck,
				torsoWaist: ApparelGroup.torsoWaist,
				thighAnkle: ApparelGroup.thighAnkle,
				ankleToe: ApparelGroup.ankleToe,
				acessories: ApparelGroup.acessories

				// trackPrefix: 'http/co.jumisa.met'
			};

			try {
				console.log(inputData);
				// await Storage.put(key, File, {
				// 	level: 'protected',
				// 	contentType: mimeType,
				// 	progressCallback(progress) {
				// 		console.log(`Uploading... ${Math.floor(progress.loaded * 100 / progress.total)}%`);
				// 		//todo create upload bar for better uploading
				// 	}
				// });
				// await API.graphql(graphqlOperation(CreatePost, { input: inputData }));
				console.log('Success');
			} catch (err) {
				console.log('error: ', err);
			}
			// console.log(inputData);
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
						<label>Post Tags//lowercase //Enter from here//Singular </label>
						{tags.attr.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'tags')}>delete</button>
							</p>
						))}
					</div>
					<input
						placeholder="Tags eg. moccasin, high heels..."
						value={PostTags}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'tags');
						}}
						onChange={(e) => updatePostTags(e.target.value)}
					/>
				</div>

				<div>
					<div>
						<br />
						<label>Category n Style</label>
						{tags.category.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'tags_cat')}>delete</button>
							</p>
						))}

						{tags.style.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'tags_style')}>delete</button>
							</p>
						))}
					</div>
					<select
						value={category}
						onChange={(e) => {
							e.persist();
							updateCategory(e.target.value);
							enterHandler(e, 'tags_cat');
						}}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'tags_cat');
						}}
						required
					>
						<option value="null">SEX</option>
						<option value="MALE">Male</option>
						<option value="WOMEN">Female</option>
						<option value="KIDS">Kids</option>
					</select>
					<input
						placeholder="E.g. 90's, Contemporary , highStreet..."
						value={style}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'tags_style');
						}}
						onChange={(e) => updateStyle(e.target.value)}
					/>
				</div>

				<div>
					<h3>Apparel Group</h3>
					<p style={{ fontSize: '14px' }}>Press enter to add a new Tag</p>

					<div>
						<label className="label">
							<strong>hairNeck //hairextension eye wear...</strong> ...Press Enter to confirm
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
							<strong>torsoWaist //dress shirt...</strong> ...Press Enter to confirm
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
							<strong>thighAnkle //trousers skirts...</strong> ...Press Enter to confirm
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
							<strong>ankleToe // shoes sandals...</strong> ...Press Enter to confirm
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
							<strong>acessories //jewery nags ...</strong> ...Press Enter to confirm
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
					<div>
						<label className="label">
							<strong>Other1</strong> ...Press Enter to confirm
						</label>
						<div>
							{ApparelGroup.Other1.map((item, id) => (
								<p key={id} className="listed">
									{id + 1} : {item} <button onClick={() => deleteItem(item, 'Other1')}>delete</button>
								</p>
							))}
						</div>
						<input
							placeholder="Product link_ _ _"
							value={Other1}
							onKeyPress={(e) => {
								e.key === 'Enter' && enterHandler(e, 'Other1');
							}}
							onChange={(e) => {
								updateOther1(e.target.value);
							}}
						/>
					</div>
				</div>
				<div>
					<label className="label">
						<strong>Other2</strong> ...Press Enter to confirm
					</label>
					<div>
						{ApparelGroup.Other2.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'Other2')}>delete</button>
							</p>
						))}
					</div>
					<input
						placeholder="Product link_ _ _"
						value={Other2}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'Other2');
						}}
						onChange={(e) => {
							updateOther2(e.target.value);
						}}
					/>
				</div>
				<div>
					<label className="label">
						<strong>Other3</strong> ...Press Enter to confirm
					</label>
					<div>
						{ApparelGroup.Other3.map((item, id) => (
							<p key={id} className="listed">
								{id + 1} : {item} <button onClick={() => deleteItem(item, 'Other3')}>delete</button>
							</p>
						))}
					</div>
					<input
						placeholder="Product link_ _ _"
						value={Other3}
						onKeyPress={(e) => {
							e.key === 'Enter' && enterHandler(e, 'Other3');
						}}
						onChange={(e) => {
							updateOther3(e.target.value);
						}}
					/>
				</div>
				<button className="button" onClick={createPost}>
					i've doule checked... Create Post
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

export default AddPost;
