import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		image: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		openSeats: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
