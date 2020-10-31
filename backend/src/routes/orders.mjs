import express from 'express'
import Order from '../models/orders'
import { ORDERS } from '../config'
const router = express.Router()

/* GET Orders page. */
router.get('/', async function(req, res, next) {
    const allOrders = await Order.find()
    if(!allOrders) res.status(400).send({error : "No order was found"})
    return res.status(200).send(allOrders)
})

/* GET Generate Orders page. */
router.get('/generate-orders', function(req, res, next) {
    const orders = ORDERS.map(order => 
        new Order(order).save((err, res) => {
            if (err) console.log(err)
            console.log(res)
        }))
    return res.json(`Generated ${orders.length} orders!`)
})

export default router