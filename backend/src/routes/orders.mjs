import express from 'express';
import Order from '../models/orders';

const router = express.Router();

/* GET Orders page. */
router.get('/', async (req, res) => {
  const allOrders = await Order.find();
  if (!allOrders) return res.status(400).send({ error: 'No order was found' });
  return res.status(200).send(allOrders);
});

/* GET Order by reference page. */
router.get('/:reference', async (req, res) => {
  const order = await Order.findOne({ reference: req.params.reference });
  if (!order) return res.status(400).send({ error: 'No order was found' });
  return res.status(200).send(order);
});

export default router;
