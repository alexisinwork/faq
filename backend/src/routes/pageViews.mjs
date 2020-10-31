import express from 'express'
const router = express.Router()

/* GET PW page. */
router.get('/', function(req, res, next) {
    console.log('PW called')
    return res.json([])
})

export default router