import express from 'express';
import PageView from '../models/pageViews';

const router = express.Router();

/* GET Update Page View counter. */
router.get('/:name', async (req, res) => {
  const pageCounter = await PageView.findOne({ name: req.params.name });
  if (!pageCounter) res.status(400).send({ error: 'No order was found' });
  return res.status(200).send(pageCounter);
});

/* POST Update Page View counter. */
router.post('/:name', async (req, res) => {
  const view = await PageView.findOne({ name: req.params.name });

  PageView.updateOne(
    { name: req.params.name },
    { counter: view.counter + 1 },
    { new: true },
    (err) => {
      if (err) {
        return res.send(err);
      }
      return res.status(200).send(`PageViews ${req.params.name} was updated`);
    },
  );
});

export default router;
