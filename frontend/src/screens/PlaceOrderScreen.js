import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_REQUEST':
			return { ...state, loading: true };
		case 'CREATE_SUCCESS':
			return { ...state, loading: false };
		case 'CREATE_FAIL':
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default function PlaceOrderScreen() {
	const navigate = useNavigate();

	const [ { loading }, dispatch ] = useReducer(reducer, {
		loading: false
	});

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
	cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.openSeats * c.price, 0));
	cart.totalPrice = cart.itemsPrice;

	const placeOrderHandler = async () => {
		try {
			dispatch({ type: 'CREATE_REQUEST' });

			const { data } = await Axios.post(
				'/api/orders',
				{
					orderItems: cart.cartItems,
					validareComanda: cart.validareComanda,
					paymentMethod: cart.paymentMethod,
					itemsPrice: cart.itemsPrice,
					totalPrice: cart.totalPrice
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.token}`
					}
				}
			);
			ctxDispatch({ type: 'CART_CLEAR' });
			dispatch({ type: 'CREATE_SUCCESS' });
			localStorage.removeItem('cartItems');
			navigate(`/order/${data.order._id}`);
		} catch (err) {
			dispatch({ type: 'CREATE_FAIL' });
			toast.error(getError(err));
		}
	};

	useEffect(
		() => {
			if (!cart.paymentMethod) {
				navigate('/payment');
			}
		},
		[ cart, navigate ]
	);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<Helmet>
				<title>Detalii Comanda</title>
			</Helmet>
			<h1 className="my-3">Detalii Comanda</h1>
			<Row>
				<Col md={8}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>Detalii</Card.Title>
							<Card.Text>
								<strong>Name:</strong> {cart.validareComanda.fullName} <br />
								<strong>Address: </strong> {cart.validareComanda.address},
								{cart.validareComanda.city},
								{cart.validareComanda.country}
							</Card.Text>
							<Link to="/details">Editeaza</Link>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Body>
							<Card.Title>Plata</Card.Title>
							<Card.Text>
								<strong>Metoda:</strong> {cart.paymentMethod}
							</Card.Text>
							<Link to="/payment">Editeaza</Link>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Body>
							<Card.Title>Evenimente</Card.Title>
							<ListGroup variant="flush">
								{cart.cartItems.map((item) => (
									<ListGroup.Item key={item._id}>
										<Row className="align-items-center">
											<Col md={6}>
												<img
													src={item.image}
													alt={item.name}
													className="img-fluid rounded img-thumbnail"
												/>{' '}
												<Link to={`/event/${item.slug}`}>{item.name}</Link>
											</Col>
											<Col md={3}>
												<span>{item.openSeats}</span>
											</Col>
											<Col md={3}>{item.price} lei</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
							<Link to="/cart">Editeaza</Link>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Detalii Comanda</Card.Title>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Evenimente</Col>
										<Col>{cart.itemsPrice.toFixed(2)} lei</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Total</strong>
										</Col>
										<Col>
											<strong>{cart.totalPrice.toFixed(2)} lei</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<div className="d-grid">
										<Button
											type="button"
											onClick={placeOrderHandler}
											disabled={cart.cartItems.length === 0}
										>
											Plaseaza Comanda
										</Button>
									</div>
									{loading && <LoadingBox />}
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
