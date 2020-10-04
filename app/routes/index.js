const koaRouter = require('koa-router')
const router = new koaRouter();
router
    .post('/donate', require('../controllers/donates').insert)

module.exports = router;