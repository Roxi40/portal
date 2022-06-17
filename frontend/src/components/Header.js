import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from '../Store';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const signoutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('validareComanda');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};

	return (
		<div>
			<header>
				<Navbar bg="dark" variant="dark" expand="lg">
					<Container>
						<LinkContainer to="/">
							<Navbar.Brand>T.R.</Navbar.Brand>
						</LinkContainer>
						<LinkContainer to="/">
							<Navbar.Brand>Home</Navbar.Brand>
						</LinkContainer>
						<LinkContainer to="/eventsfull">
							<Navbar.Brand>Evenimente</Navbar.Brand>
						</LinkContainer>
						<LinkContainer to="/blogsfull">
							<Navbar.Brand>Blog</Navbar.Brand>
						</LinkContainer>
						<LinkContainer to="/contact">
							<Navbar.Brand>Contact</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<SearchBox />
							<Nav className="me-auto  w-100  justify-content-end">
								<Link to="/cart" className="nav-link">
									Cos
									{cart.cartItems.length > 0 && (
										<Badge pill bg="danger">
											{cart.cartItems.reduce((a, c) => a + c.openSeats, 0)}
										</Badge>
									)}
								</Link>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id="basic-nav-dropdown">
										<LinkContainer to="/profile">
											<NavDropdown.Item>Profil</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/orderhistory">
											<NavDropdown.Item>Istoric Comenzi</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
											Log Out
										</Link>
									</NavDropdown>
								) : (
									<Link className="nav-link" to="/signin">
										Autentificare
									</Link>
								)}
								{userInfo &&
								userInfo.isAdmin && (
									<NavDropdown title="Admin" id="admin-nav-dropdown">
										<LinkContainer to="/admin/events">
											<NavDropdown.Item>Evenimente</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/blogs">
											<NavDropdown.Item>Blog</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/orders">
											<NavDropdown.Item>Comenzi</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/admin/users">
											<NavDropdown.Item>Utilizatori</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</div>
	);
}

export default App;
