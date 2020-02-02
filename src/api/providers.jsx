import { Provider as users } from './users/context';
import { Provider as auth } from './auth/context';
import reviews from './reviews/context/provider';
import genres from './genres/context/provider';
import books from './books/context/provider';

export default [auth, users, genres, reviews, books];
