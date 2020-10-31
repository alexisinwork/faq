import express from 'express'
const router = express.Router()

/* GET Orders page. */
router.get('/', function(req, res, next) {
    console.log('Users called')
    return res.json([])
})

export default router