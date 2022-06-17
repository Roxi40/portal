import { NavLink } from 'react-router-dom';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();
		emailjs.sendForm('service_leb4tp5', 'template_we7ikyp', form.current, '2lERHsqvl4i4o-0Bw').then(
			(result) => {
				console.log(result.text);
				console.log('message sent');
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<div className="container">
			<h2 className="mb-4 m-3 text-center">Contact</h2>
			<div className="text-muted shadow-sm rounded p-3 lh-2 align-items-center justify-content-center">
				<div className="row">
					<div className="col-md-6">
						{/*Contact Form DIVIDED INTO 2 > LEFT IS THE FORM > RIGHT IS THE ADDRESS + PHONE NUMBER + E-MAIL*/}
						{/*LEFT FORM*/}
						<h4 className="pb-3 text-center">Scrie-ne un mesaj</h4>
						<form action="POST">
							<div className="form-group m-3">
								<input type="text" className="form-control" id="exampleInputName1" placeholder="Nume" />
							</div>
							<div className="form-group m-3">
								<input
									type="text"
									className="form-control"
									id="exampleInputSurname1"
									placeholder="Prenume"
								/>
							</div>
							<div className="form-group m-3">
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="E-mail"
									required
								/>
							</div>
							<div className="form-group m-3">
								<input
									type="number"
									className="form-control"
									id="exampleInputPhone1"
									placeholder="Numar de telefon"
								/>
							</div>
							<div className="form-group m-3">
								<textarea
									className="form-control"
									id="exampleInputText1"
									placeholder="Mesajul tau..."
									rows="3  "
									required
								/>
								<button type="reset" className="btn m-3 align-items-end text-white text-center">
									Reset
								</button>
							</div>

							<div className="form-check m-3">
								<input type="checkbox" className="form-check-input" id="exampleCheck1" required />
								<label className="form-check-label" htmlFor="exampleCheck1">
									Prin utilizarea acestui formular, inseamna ca ai citit si ai fost de acord cu{' '}
									<NavLink to="/confidentialitate">Politica de Confidentialitate</NavLink>
								</label>
							</div>
							<div className="d-grid">
								<button type="submit" className="btn btn-primary m-3 text-white">
									Trimite mesajul
								</button>
							</div>
						</form>
					</div>

					{/*RIGHT - DATE DE CONTACT*/}
					<div className="col-md-6">
						<h4 className="pb-3 text-center">Date de Contact</h4>

						<div className="p-2">
							<h5>Orar de lucru:</h5>
							<p className="ps-2">Luni – Vineri, 08:00-17:00</p>
						</div>

						<div className="p-2">
							<h5>Adresa Sediu:</h5>
							<p className="ps-2">Str. Dâmbovnicului, nr. 22 Sector 4, Bucureşti</p>
						</div>

						<div className="p-2">
							<h5>E-mail:</h5>
							<p className="ps-2">roxana@travelingromania.ro</p>
						</div>

						<div className="p-2">
							<h5>Telefon:</h5>
							<p className="ps-2">+40 21 316 1646</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
