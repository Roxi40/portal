import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		image: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		text: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
