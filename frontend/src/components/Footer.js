import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Footer() {
	return (
		<div className="container-fluid bg-info bg-gradient text-white" style={{ minHeight: '12rem' }}>
			<div className="row pt-2 text-center">
				<div className="col-lg-4 col-md-4 col-sm-12">
					<p className="text-start p-2">Copyright @2022</p>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 text-center">
					<h5 className="border-bottom">Informatii Utile</h5>
					<div className="d-flex flex-column align-items-evenly mb-4">
						<NavLink
							to="https://anpc.ro/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white text-decoration-none p-1"
						>
							ANPC
						</NavLink>
						<NavLink to="/termeni" className="text-white text-decoration-none p-1">
							Termeni si Conditii
						</NavLink>
						<NavLink to="/confidentialitate" className="text-white text-decoration-none p-1">
							Politica de Confidentialitate
						</NavLink>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 text-center">
					<h5 className="border-bottom">Contact</h5>
					<div className="d-flex flex-column align-items-evenly mb-4">
						<NavLink to="/contact" className="text-white text-decoration-none">
							🖂 Contact
						</NavLink>
						<NavLink to="https://ro-ro.facebook.com/" className="text-white text-decoration-none p-1">
							<i className="fa-brands fa-facebook" /> Facebook
						</NavLink>
						<NavLink to="https://www.instagram.com/" className="text-white text-decoration-none p-1">
							<i className="fa-brands fa-instagram" /> Instagram
						</NavLink>
						<NavLink to="https://twitter.com/?lang=ro" className="text-white text-decoration-none p-1">
							<i className="fa-brands fa-twitter" /> Twitter
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
