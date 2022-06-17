import express from 'express';
import Event from '../models/eventModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import Blog from '../models/blogModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
	await Event.remove({});
	const createdEvents = await Event.insertMany(data.events);
	await Blog.remove({});
	const createdBlogs = await Blog.insertMany(data.blogs);
	await User.remove({});
	const createdUsers = await User.insertMany(data.users);
	res.send({ createdEvents, createdUsers, createdBlogs });
});
export default seedRouter;
