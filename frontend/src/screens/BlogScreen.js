import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
	switch (action.type) {
		case 'REFRESH_BLOG':
			return { ...state, blog: action.payload };
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, blog: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function BlogScreen() {
	const [ selectedImage, setSelectedImage ] = useState('');
	const navigate = useNavigate();
	const params = useParams();
	const { slug } = params;

	const [ { loading, error, blog }, dispatch ] = useReducer(reducer, {
		blog: [],
		loading: true,
		error: ''
	});
	useEffect(
		() => {
			const fetchData = async () => {
				dispatch({ type: 'FETCH_REQUEST' });
				try {
					const result = await axios.get(`/api/blogs/slug/${slug}`);
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
				} catch (err) {
					dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
				}
			};
			fetchData();
		},
		[ slug ]
	);

	return loading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img className="img-large" src={selectedImage || blog.image} alt={blog.name} />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Helmet>
								<title>{blog.name}</title>
							</Helmet>
							<h1>{blog.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row xs={1} md={2} className=" image-blog g-2">
								{[ blog.image ].map((x) => (
									<Col key={x}>
										<Card>
											<Button
												className="thumbnail"
												type="button"
												variant="light"
												onClick={() => setSelectedImage(x)}
											>
												<Card.Img variant="top" src={x} alt="blog" />
											</Button>
										</Card>
									</Col>
								))}
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							Descriere:
							<p>{blog.description}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							Text:
							<p>{blog.text}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</div>
	);
}
export default BlogScreen;
