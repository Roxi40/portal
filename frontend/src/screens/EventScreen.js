import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
	switch (action.type) {
		case 'REFRESH_EVENT':
			return { ...state, event: action.payload };
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, event: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

function EventScreen() {
	const [ selectedImage, setSelectedImage ] = useState('');

	const navigate = useNavigate();
	const params = useParams();
	const { slug } = params;

	const [ { loading, error, event }, dispatch ] = useReducer(reducer, {
		event: [],
		loading: true,
		error: ''
	});
	useEffect(
		() => {
			const fetchData = async () => {
				dispatch({ type: 'FETCH_REQUEST' });
				try {
					const result = await axios.get(`/api/events/slug/${slug}`);
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
				} catch (err) {
					dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
				}
			};
			fetchData();
		},
		[ slug ]
	);

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x) => x._id === event._id);
		const openSeats = existItem ? existItem.openSeats + 1 : 1;
		const { data } = await axios.get(`/api/events/${event._id}`);
		if (data.openSeats < openSeats) {
			window.alert('Ne pare rau. Nu mai sunt locuri disponibile');
			return;
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...event, openSeats }
		});
		navigate('/cart');
	};

	return loading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img className="img-large" src={selectedImage || event.image} alt={event.name} />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Helmet>
								<title>{event.name}</title>
							</Helmet>
							<h1>{event.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>Pret: {event.price} lei</ListGroup.Item>
						<ListGroup.Item>
							<Row xs={1} md={2} className="g-2">
								{[ event.image ].map((x) => (
									<Col key={x}>
										<Card>
											<Button
												className="thumbnail"
												type="button"
												variant="light"
												onClick={() => setSelectedImage(x)}
											>
												<Card.Img variant="top" src={x} alt="event" />
											</Button>
										</Card>
									</Col>
								))}
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							Descriere:
							<p>{event.description}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<Card.Body>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Pret:</Col>
										<Col>{event.price} lei</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Disponibilitate:</Col>
										<Col>
											{event.openSeats > 0 ? (
												<Badge bg="success">Locuri disponibile</Badge>
											) : (
												<Badge bg="danger">Nu mai sunt locuri disponibile</Badge>
											)}
										</Col>
									</Row>
								</ListGroup.Item>

								{event.openSeats > 0 && (
									<ListGroup.Item>
										<div className="d-grid">
											<Button onClick={addToCartHandler} variant="primary">
												Adaugati in cos
											</Button>
										</div>
									</ListGroup.Item>
								)}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
export default EventScreen;
