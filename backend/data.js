import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'Roxana',
			email: 'admin@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: true
		},
		{
			name: 'Roxi',
			email: 'user@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: false
		}
	],
	events: [
		{
			// _id: '1',
			name: 'O zi la plaja',
			slug: 'o-zi-la-plaja',
			category: 'mare',
			image: '/images/p1.jpg',
			price: 120,
			openSeats: 10,
			description: 'Calatorie in Vama Veche'
		}
	]
};
export default data;
