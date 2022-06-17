import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import { isAuth, isAdmin } from '../utils.js';

const blogRouter = express.Router();

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find();
	res.send(blogs);
});

blogRouter.post(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const newBlog = new Blog({
			name: 'nume',
			slug: 'exemplu-adresa',
			image: '/images/p1.jpg',
			category: 'categorie',
			description: 'descriere',
			text: 'text'
		});
		const blog = await newBlog.save();
		res.send({ message: 'Postare creata', blog });
	})
);

blogRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const blogId = req.params.id;
		const blog = await Blog.findById(blogId);
		if (blog) {
			blog.name = req.body.name;
			blog.slug = req.body.slug;
			blog.image = req.body.image;
			blog.category = req.body.category;
			blog.description = req.body.description;
			blog.text = req.body.text;
			await blog.save();
			res.send({ message: 'Postare actualizata' });
		} else {
			res.status(404).send({ message: 'Postarea nu a fost gasita' });
		}
	})
);

blogRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const blog = await Blog.findById(req.params.id);
		if (blog) {
			await blog.remove();
			res.send({ message: 'Postarea a fost stearsa' });
		} else {
			res.status(404).send({ message: 'Postarea nu a fost gasita' });
		}
	})
);

const PAGE_SIZE = 10;

blogRouter.get(
	'/admin',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const { query } = req;
		const page = query.page || 1;
		const pageSize = query.pageSize || PAGE_SIZE;
		const blogs = await Blog.find().skip(pageSize * (page - 1)).limit(pageSize);
		const countBlogs = await Blog.countDocuments();
		res.send({
			blogs,
			countBlogs,
			page,
			pages: Math.ceil(countBlogs / pageSize)
		});
	})
);

blogRouter.get(
	'/search',
	expressAsyncHandler(async (req, res) => {
		const { query } = req;
		const pageSize = query.pageSize || PAGE_SIZE;
		const page = query.page || 1;
		const category = query.category || '';
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
		const sortOrder =
			order === 'featured' ? { featured: -1 } : order === 'newest' ? { createdAt: -1 } : { _id: -1 };

		const blogs = await Blog.find({
			...queryFilter,
			...categoryFilter
		})
			.sort(sortOrder)
			.skip(pageSize * (page - 1))
			.limit(pageSize);

		const countBlogs = await Blog.countDocuments({
			...queryFilter,
			...categoryFilter
		});
		res.send({
			blogs,
			countBlogs,
			page,
			pages: Math.ceil(countBlogs / pageSize)
		});
	})
);

blogRouter.get(
	'/categories',
	expressAsyncHandler(async (req, res) => {
		const categories = await Blog.find().distinct('category');
		res.send(categories);
	})
);

blogRouter.get('/slug/:slug', async (req, res) => {
	const blog = await Blog.findOne({ slug: req.params.slug });
	if (blog) {
		res.send(blog);
	} else {
		res.status(404).send({ message: 'Postarea nu a fost gasita' });
	}
});
blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog) {
		res.send(blog);
	} else {
		res.status(404).send({ message: 'Postarea nu a fost gasita' });
	}
});

export default blogRouter;
