import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Events from './screens/Events';
import EventScreen from './screens/EventScreen';
import Blogs from './screens/Blogs';
import Container from 'react-bootstrap/Container';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ValidareComandaScreen from './screens/ValidareComandaScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import EventListScreen from './screens/EventListScreen';
import EventEditScreen from './screens/EventEditScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogEditScreen from './screens/BlogEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ErrorPage from './screens/Error/ErrorPage';
import Termeni from './screens/Termeni/Termeni';
import Confidentialitate from './screens/Termeni/Confidentialitate';
import Home from './screens/Home/Home';
import Footer from './components/Footer';
import ContactUs from './screens/Contact';
import SearchScreen from './screens/SearchScreen';
import Header from './components/Header';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div>
				<ToastContainer position="bottom-center" limit={1} />

				<main>
					<Container className="mt-3">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/eventsfull" element={<Events />} />
							<Route path="/blogsfull" element={<Blogs />} />
							<Route path="/termeni" element={<Termeni />} />
							<Route path="/confidentialitate" element={<Confidentialitate />} />
							<Route path="/contact" element={<ContactUs />} />
							<Route path="*" element={<ErrorPage />} />

							<Route path="/event/:slug" element={<EventScreen />} />
							<Route path="/cart" element={<CartScreen />} />
							<Route path="/search" element={<SearchScreen />} />
							<Route path="/signin" element={<SigninScreen />} />
							<Route path="/signup" element={<SignupScreen />} />
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<ProfileScreen />
									</ProtectedRoute>
								}
							/>
							<Route path="/placeorder" element={<PlaceOrderScreen />} />
							<Route
								path="/order/:id"
								element={
									<ProtectedRoute>
										<OrderScreen />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/orderhistory"
								element={
									<ProtectedRoute>
										<OrderHistoryScreen />
									</ProtectedRoute>
								}
							/>
							<Route path="/details" element={<ValidareComandaScreen />} />
							<Route path="/payment" element={<PaymentMethodScreen />} />

							{/* Admin Routes */}
							<Route
								path="/admin/orders"
								element={
									<AdminRoute>
										<OrderListScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/users"
								element={
									<AdminRoute>
										<UserListScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/events"
								element={
									<AdminRoute>
										<EventListScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/event/:id"
								element={
									<AdminRoute>
										<EventEditScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/blogs"
								element={
									<AdminRoute>
										<BlogListScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/blog/:id"
								element={
									<AdminRoute>
										<BlogEditScreen />
									</AdminRoute>
								}
							/>
							<Route
								path="/admin/user/:id"
								element={
									<AdminRoute>
										<UserEditScreen />
									</AdminRoute>
								}
							/>
						</Routes>
						<Footer />
					</Container>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
