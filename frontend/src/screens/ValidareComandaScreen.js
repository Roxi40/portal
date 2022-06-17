import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ValidareComandaScreen() {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { fullBox, userInfo, cart: { validareComanda } } = state;
	const [ fullName, setFullName ] = useState(validareComanda.fullName || '');
	const [ address, setAddress ] = useState(validareComanda.address || '');
	const [ city, setCity ] = useState(validareComanda.city || '');
	useEffect(
		() => {
			if (!userInfo) {
				navigate('/signin?redirect=/shipping');
			}
		},
		[ userInfo, navigate ]
	);
	const [ country, setCountry ] = useState(validareComanda.country || '');
	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				fullName,
				address,
				city,
				country,
				location: validareComanda.location
			}
		});
		localStorage.setItem(
			'validareComanda',
			JSON.stringify({
				fullName,
				address,
				city,
				country,
				location: validareComanda.location
			})
		);
		navigate('/payment');
	};

	useEffect(
		() => {
			ctxDispatch({ type: 'SET_FULLBOX_OFF' });
		},
		[ ctxDispatch, fullBox ]
	);

	return (
		<div>
			<Helmet>
				<title>Validare Comanda</title>
			</Helmet>

			<CheckoutSteps step1 step2 />
			<div className="container small-container">
				<h1 className="my-3">Validare Comanda</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="fullName">
						<Form.Label>Full Name</Form.Label>
						<Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="address">
						<Form.Label>Adresa</Form.Label>
						<Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="city">
						<Form.Label>Oras</Form.Label>
						<Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="country">
						<Form.Label>Tara</Form.Label>
						<Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
					</Form.Group>
					<div className="mb-3">
						<Button variant="primary" type="submit">
							Continua
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
