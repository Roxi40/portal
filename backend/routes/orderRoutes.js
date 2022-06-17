import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Event from '../models/eventModel.js';
import { isAuth, isAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find().populate('user', 'name');
		res.send(orders);
	})
);

orderRouter.post(
	'/',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const newOrder = new Order({
			orderItems: req.body.orderItems.map((x) => ({ ...x, event: x._id })),
			validareComanda: req.body.validareComanda,
			paymentMethod: req.body.paymentMethod,
			itemsPrice: req.body.itemsPrice,
			totalPrice: req.body.totalPrice,
			user: req.user._id
		});

		const order = await newOrder.save();
		res.status(201).send({ message: 'Comanda noua creata', order });
	})
);

orderRouter.get(
	'/summary',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.aggregate([
			{
				$group: {
					_id: null,
					numOrders: { $sum: 1 },
					totalSales: { $sum: '$totalPrice' }
				}
			}
		]);
		const users = await User.aggregate([
			{
				$group: {
					_id: null,
					numUsers: { $sum: 1 }
				}
			}
		]);
		const dailyOrders = await Order.aggregate([
			{
				$group: {
					_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
					orders: { $sum: 1 },
					sales: { $sum: '$totalPrice' }
				}
			},
			{ $sort: { _id: 1 } }
		]);
		const eventCategories = await Event.aggregate([
			{
				$group: {
					_id: '$category',
					count: { $sum: 1 }
				}
			}
		]);
		res.send({ users, orders, dailyOrders, eventCategories });
	})
);

orderRouter.get(
	'/mine',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find({ user: req.user._id });
		res.send(orders);
	})
);

orderRouter.get(
	'/:id',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		if (order) {
			res.send(order);
		} else {
			res.status(404).send({ message: 'Comanda nu a fost gasita' });
		}
	})
);

orderRouter.put(
	'/:id/pay',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id).populate('user', 'email name');
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address
			};

			res.send({ message: 'Comanda Platita', order: updatedOrder });
		} else {
			res.status(404).send({ message: 'Comanda nu a fost gasita' });
		}
	})
);

orderRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id);
		if (order) {
			await order.remove();
			res.send({ message: 'Comanda Anulata' });
		} else {
			res.status(404).send({ message: 'Comanda nu a fost gasita' });
		}
	})
);

export default orderRouter;
