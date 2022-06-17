import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import { isAuth, isAdmin } from '../utils.js';

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
	const events = await Event.find();
	res.send(events);
});

eventRouter.post(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const newEvent = new Event({
			name: 'sample name ' + Date.now(),
			slug: 'sample-name-' + Date.now(),
			image: '/images/p1.jpg',
			price: 0,
			category: 'sample category',
			openSeats: 0,
			dates: 'data',
			description: 'sample description'
		});
		const event = await newEvent.save();
		res.send({ message: 'Event Created', event });
	})
);

eventRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const eventId = req.params.id;
		const event = await Event.findById(eventId);
		if (event) {
			event.name = req.body.name;
			event.slug = req.body.slug;
			event.price = req.body.price;
			event.image = req.body.image;
			event.category = req.body.category;
			event.dates = req.body.openDates;
			event.openSeats = req.body.openSeats;
			event.description = req.body.description;
			await event.save();
			res.send({ message: 'Event Updated' });
		} else {
			res.status(404).send({ message: 'Event Not Found' });
		}
	})
);

eventRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const event = await Event.findById(req.params.id);
		if (event) {
			await event.remove();
			res.send({ message: 'Event Deleted' });
		} else {
			res.status(404).send({ message: 'Event Not Found' });
		}
	})
);

const PAGE_SIZE = 3;

eventRouter.get(
	'/admin',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const { query } = req;
		const page = query.page || 1;
		const pageSize = query.pageSize || PAGE_SIZE;
		const events = await Event.find().skip(pageSize * (page - 1)).limit(pageSize);
		const countEvents = await Event.countDocuments();
		res.send({
			events,
			countEvents,
			page,
			pages: Math.ceil(countEvents / pageSize)
		});
	})
);

eventRouter.get(
	'/search',
	expressAsyncHandler(async (req, res) => {
		const { query } = req;
		const pageSize = query.pageSize || PAGE_SIZE;
		const page = query.page || 1;
		const category = query.category || '';
		const price = query.price || '';
		const order = query.order || '';
		const searchQuery = query.query || '';
		const queryFilter =
			searchQuery && searchQuery !== 'all'
				? {
						name: {
							$regex: searchQuery,
							$options: 'i'
						}
					}
				: {};
		const categoryFilter = category && category !== 'all' ? { category } : {};
		const priceFilter =
			price && price !== 'all'
				? {
						// 1-50
						price: {
							$gte: Number(price.split('-')[0]),
							$lte: Number(price.split('-')[1])
						}
					}
				: {};
		const sortOrder =
			order === 'featured'
				? { featured: -1 }
				: order === 'lowest'
					? { price: 1 }
					: order === 'highest' ? { price: -1 } : order === 'newest' ? { createdAt: -1 } : { _id: -1 };

		const events = await Event.find({
			...queryFilter,
			...categoryFilter,
			...priceFilter
		})
			.sort(sortOrder)
			.skip(pageSize * (page - 1))
			.limit(pageSize);

		const countEvents = await Event.countDocuments({
			...queryFilter,
			...categoryFilter,
			...priceFilter
		});
		res.send({
			events,
			countEvents,
			page,
			pages: Math.ceil(countEvents / pageSize)
		});
	})
);

eventRouter.get(
	'/categories',
	expressAsyncHandler(async (req, res) => {
		const categories = await Event.find().distinct('category');
		res.send(categories);
	})
);

eventRouter.get('/slug/:slug', async (req, res) => {
	const event = await Event.findOne({ slug: req.params.slug });
	if (event) {
		res.send(event);
	} else {
		res.status(404).send({ message: 'Eveniment nu a fost gasit' });
	}
});
eventRouter.get('/:id', async (req, res) => {
	const event = await Event.findById(req.params.id);
	if (event) {
		res.send(event);
	} else {
		res.status(404).send({ message: 'Eveniment nu a fost gasit' });
	}
});

export default eventRouter;
