import express from 'express';
import users from './users';
import reviews from './reviews';
import books from './books';
import genres from './genres';
import auth from './auth';

const route = express.Router();

route.use('/api', [auth, users]);
// eslint-disable-next-line
route.use('/api', (req, res, next) => req.isAuthenticated() ? next() : res.status(403)
    .send('Forbidden'), [genres, reviews, books]); // eslint-disable-lint

export default route;
