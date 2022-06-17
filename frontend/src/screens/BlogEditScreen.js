import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		case 'UPDATE_REQUEST':
			return { ...state, loadingUpdate: true };
		case 'UPDATE_SUCCESS':
			return { ...state, loadingUpdate: false };
		case 'UPDATE_FAIL':
			return { ...state, loadingUpdate: false };

		default:
			return state;
	}
};
export default function BlogEditScreen() {
	const navigate = useNavigate();
	const params = useParams(); // /blog/:id
	const { id: blogId } = params;

	const { state } = useContext(Store);
	const { userInfo } = state;
	const [ { loading, error, loadingUpdate }, dispatch ] = useReducer(reducer, {
		loading: true,
		error: ''
	});

	const [ name, setName ] = useState('');
	const [ slug, setSlug ] = useState('');
	const [ image, setImage ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ text, setText ] = useState('');

	useEffect(
		() => {
			const fetchData = async () => {
				try {
					dispatch({ type: 'FETCH_REQUEST' });
					const { data } = await axios.get(`/api/blogs/${blogId}`);
					setName(data.name);
					setSlug(data.slug);
					setImage(data.image);
					setCategory(data.category);
					setDescription(data.description);
					setText(data.text);
					dispatch({ type: 'FETCH_SUCCESS' });
				} catch (err) {
					dispatch({
						type: 'FETCH_FAIL',
						payload: getError(err)
					});
				}
			};
			fetchData();
		},
		[ blogId ]
	);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			dispatch({ type: 'UPDATE_REQUEST' });
			await axios.put(
				`/api/blogs/${blogId}`,
				{
					_id: blogId,
					name,
					slug,
					image,
					category,
					description,
					text
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` }
				}
			);
			dispatch({
				type: 'UPDATE_SUCCESS'
			});
			toast.success('Postarea a fost actualizata cu succes');
			navigate('/admin/blogs');
		} catch (err) {
			toast.error(getError(err));
			dispatch({ type: 'UPDATE_FAIL' });
		}
	};
	return (
		<Container className="small-container">
			<Helmet>
				<title>Modifica postarea ${blogId}</title>
			</Helmet>
			<h1>Editeaza postarea {blogId}</h1>

			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Titlu</Form.Label>
						<Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="slug">
						<Form.Label>URL</Form.Label>
						<Form.Control value={slug} onChange={(e) => setSlug(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="image">
						<Form.Label>Imagine</Form.Label>
						<Form.Control value={image} onChange={(e) => setImage(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="category">
						<Form.Label>Categorie</Form.Label>
						<Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
							<option>Selectati</option>
							<option value="1">mare</option>
							<option value="2">munte</option>
							<option value="3">oras</option>
							<option value="4">delta</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Descriere</Form.Label>
						<Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="text">
						<Form.Label>Text</Form.Label>
						<Form.Control
							as="textarea"
							rows={5}
							value={text}
							onChange={(e) => setText(e.target.value)}
							required
						/>
					</Form.Group>
					<div className="mb-3">
						<Button disabled={loadingUpdate} type="submit">
							Updateaza
						</Button>
						{loadingUpdate && <LoadingBox />}
					</div>
				</Form>
			)}
		</Container>
	);
}
