import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import redis from 'redis';
// import jwt from 'jsonwebtoken';

import { port, databaseUrl } from './config';
import render from './services/render';
import api from './api';
import db from './services/db';
import passport from './services/passport';
import App from './components/App';
import routes from './components/routes';

const app = express();

const redisClient = redis.createClient();

const assets = path.resolve(__dirname, 'assets');

app.use(express.static(assets));
app.use(morgan('dev'));
app.use(express.json(), express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', assets);
app.use(bodyParser.json());
app.use(db(redisClient, databaseUrl));
app.use(passport(app));
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('Authenticated'); // eslint-disable-line no-console
    } else {
        console.log('Authenticated not'); // eslint-disable-line no-console
    }
    return next();
});

app.use(api);
app.use(render(App, routes));

app.listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
