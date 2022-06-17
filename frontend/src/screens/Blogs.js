import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Blog from '../components/Blog';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, blogs: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function BlogsFull() {
	const [ { loading, error, blogs }, dispatch ] = useReducer(logger(reducer), {
		blogs: [],
		loading: true,
		error: ''
	});

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get('/api/blogs');
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		};
		fetchData();
	}, []);
	return (
		<div>
			<Helmet>
				<title>T.R.</title>
			</Helmet>
			<div className="container-fluid ">
				{/* TEXT + IMAGINE PREZENTARE + Button Blog */}
				<div className="container-fluid hero-section d-flex align-items-center justify-content-center px-0 mb-5" />
			</div>
			<div className="blogs">
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<Row>
						{blogs.map((blog) => (
							<Col key={blog.slug} sm={6} md={4} lg={12} className="mb-3 p-5">
								<Blog blog={blog} />
							</Col>
						))}
					</Row>
				)}
			</div>
		</div>
	);
}
export default BlogsFull;
