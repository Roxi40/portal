import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './home.css';
import Carousel from 'react-bootstrap/Carousel';
import andrei from '../../images/andrei-mike-QXju-EIkTiM-unsplash.jpg'; // gives image path
import dan from '../../images/dan-novac-dyjV3T1qfLE-unsplash.jpg';
import group from '../../images/andrea-riondino-fIsq8v-mML8-unsplash.jpg';

function Home() {
	return (
		<div className="container-fluid">
			{/* TEXT + IMAGINE PREZENTARE + Button Blog */}
			<div className="container-fluid hero d-flex align-items-center justify-content-center px-0 mb-5">
				<div className="text-center">
					<h1 className="display-1 mb-0">TRAVELING ROMANIA</h1>
					<h2 className="display-4 mt-0">Descoperim minunatiile Romaniei</h2>
					<button className="btn btn-lg text-white">
						<NavLink to="/blogsfull">Alatura-te aventurii</NavLink>
					</button>
				</div>
			</div>

			{/*DESPRE NOI*/}
			<section className="container-fluid">
				<h3>Despre noi</h3>
				<div className="row align-items-center m-5">
					<div className="col-md-1" />
					<div className="col-md-5 ">
						<img
							src={group}
							alt="foto grup"
							className="img-fluid justify-content-center text-align-justify"
							id="img-grup"
						/>
					</div>
					<div className="col-md-6 text-justify">
						<p>
							De cand eram mici ne-am dorit să nu mergem niciodată la muncă și ne-a fost groază de rutina
							„cea de toate zilele”. Am protestat, am căutat în sufletul nostru și ne-am întrebat care
							este cel mai puternic vis pe care îl avem. A ieșit un singur cuvânt, la unison, care
							sintetizează tot: lumea, dar apoi am realizat ca primul pas în a cunoaște lumea e să ne
							cunoaștem propria casă. <br /> Sau ceea ce merită văzut, admirat, fotografiat, memorat,
							contemplat din ea. Apoi ne-am dat seama că există mulți ca noi, care vor să o guste, să o
							simtă, să o înțeleagă, să o afle. Și ne-am făcut din asta un trai, un mod de a fi. Legăm
							prietenii, ne confesăm, oferim sprijin și încurajări atunci cand este nevoie și ne străduim
							să fim mereu în competiție cu noi înșine. <br /> Azi, ghizi mai buni decât ieri. Mâine, mai
							buni decât azi. Transformăm vise în realitate și dorințe în concret. Sau cel puțin ne dăm
							toată silința să o facem. Dacă ne reușește, există un simplu mod de a testa. Vino cu noi! Ai
							curaj? Se zice că oferim Experiențe care dau dependență! Limitele – noi le-am setat. Și tot
							noi le depășim cu fiecare ocazie.
						</p>
					</div>
					<div className="col-md-1" />
				</div>
			</section>

			{/*TEXT + IMAGINE EVENIMENTE + Button Evenimente*/}
			<section className="container-fluid px-0">
				{/*TEXT + IMAGINE REZERVARE + Button Rezervari - OTHERWISE CREATE YOU OWN*/}
				<div className="row align-items-center content">
					<div className="col-md-6 text-center">
						<div className="row justify-content-center">
							<div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
								<h4>Ofertele Noastre</h4>
								<p className="lead text-muted">Daca esti interesat, alaturate aventurii!</p>
								<button className="btn btn-md text-white">
									<NavLink to="/eventsfull">Evenimente</NavLink>
								</button>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<img src={andrei} alt="munte" className="img-fluid shadow-lg" />
					</div>
				</div>

				<div className="row align-items-center content">
					<div className="col-md-6 order-2 order-md-1">
						<img src={dan} alt="brasov" className="img-fluid shadow-lg" />
					</div>
					<div className="col-md-6 text-center order-1 order-md-2">
						<div className="row justify-content-center">
							<div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
								<h4>Blogul Nostru</h4>
								<p className="lead text-muted">
									Sau daca vreti sa aflati mai mult despre alte aventuri!
								</p>
								<button className="btn btn-md text-white align-items-center">
									<NavLink to="/blogsfull">Catre Blog</NavLink>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Home;
