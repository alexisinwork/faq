import express from 'express';
import Order from '../models/orders';

const router = express.Router();

/* GET Orders page. */
router.get('/', async (req, res) => {
  const allOrders = await Order.find();
  if (!allOrders) res.status(400).send({ error: 'No order was found' });
  return res.status(200).send(allOrders);
});

export default router;
