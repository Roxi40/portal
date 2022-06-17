import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Event(props) {
	const { event } = props;

	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart: { cartItems } } = state;

	const addToCartHandler = async (item) => {
		const existItem = cartItems.find((x) => x._id === event._id);
		const openSeats = existItem ? existItem.openSeats + 1 : 1;
		const { data } = await axios.get(`/api/events/${item._id}`);
		if (data.openSeats < openSeats) {
			window.alert('Ne pare rau. Evenimentul nu mai are locuri disponibile');
			return;
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, openSeats }
		});
	};

	return (
		<Card>
			<Link to={`/event/${event.slug}`}>
				<img src={event.image} className="card-img-top" alt={event.name} />
			</Link>
			<Card.Body>
				<Link to={`/event/${event.slug}`}>
					<Card.Title>{event.name}</Card.Title>
				</Link>
				<Card.Text>{event.price} lei</Card.Text>
				{event.openSeats === 0 ? (
					<Button variant="light" disabled>
						Nu mai sunt locuri disponibile
					</Button>
				) : (
					<Button onClick={() => addToCartHandler(event)}>Adauga in cos</Button>
				)}
			</Card.Body>
		</Card>
	);
}
export default Event;
