import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart: { cartItems } } = state;

	const updateCartHandler = async (item, openSeats) => {
		const { data } = await axios.get(`/api/events/${item._id}`);
		if (data.openSeats < openSeats) {
			window.alert('Ne pare rau. Nu mai sunt locutri disponibile');
			return;
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, openSeats }
		});
	};
	const removeItemHandler = (item) => {
		ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	const checkoutHandler = () => {
		navigate('/signin?redirect=/details');
	};

	return (
		<div>
			<Helmet>
				<title>Inscriere eveniment</title>
			</Helmet>
			<h1>Inscriere eveniment</h1>
			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<MessageBox>
							Cosul tau este gol. <Link to="/eventsfull">Inapoi la evenimente</Link>
						</MessageBox>
					) : (
						<ListGroup>
							{cartItems.map((item) => (
								<ListGroup.Item key={item._id}>
									<Row className="align-items-center">
										<Col md={4}>
											<img
												src={item.image}
												alt={item.name}
												className="img-fluid rounded img-thumbnail"
											/>{' '}
											<Link to={`/event/${item.slug}`}>{item.name}</Link>
										</Col>
										<Col md={3}>
											<Button
												onClick={() => updateCartHandler(item, item.openSeats - 1)}
												variant="light"
												disabled={item.openSeats === 1}
											>
												<i className="fas fa-minus-circle" />
											</Button>{' '}
											<span>{item.openSeats}</span>{' '}
											<Button
												variant="light"
												onClick={() => updateCartHandler(item, item.openSeats + 1)}
												disabled={item.openSeats === item.openSeats}
											>
												<i className="fas fa-plus-circle" />
											</Button>
										</Col>
										<Col md={3}>{item.price} lei</Col>
										<Col md={2}>
											<Button onClick={() => removeItemHandler(item)} variant="light">
												<i className="fas fa-trash" />
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>
										Subtotal ({cartItems.reduce((a, c) => a + c.openSeats, 0)} items) : lei
										{cartItems.reduce((a, c) => a + c.price * c.openSeats, 0)}
									</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<div className="d-grid">
										<Button
											type="button"
											variant="primary"
											onClick={checkoutHandler}
											disabled={cartItems.length === 0}
										>
											Finalizeaza cumparaturile
										</Button>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
//Remove payment gateway > Rezerva imediat
