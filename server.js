const Koa = require('koa');
const koaRouter = require('koa-router');
const fs = require('fs');
const util = require('util');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');
const bodyParser = require('koa-bodyparser')
require('dotenv').config();

const { mongo: dbConfig } = require('./app/config');
const Mongoose = require('mongoose');
const uri = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/`;

Mongoose.connect(uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
});

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const app = new Koa();
const router = new koaRouter();
const readFile = util.promisify(fs.readFile);

app.use(mount('/dist', serve(path.join(__dirname, './dist'))));
app.use(bodyParser());
router.get('/', async ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = await readFile(path.join(__dirname, './index.html'));
});

app
    .use(router.routes())
    .use(require('./app/routes').routes());

app.listen(3000);