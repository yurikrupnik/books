import mongoose from 'mongoose';
import session from 'express-session';
// import connect from 'connect-mongo';
import connect from 'connect-redis';

export default (redisClient, url) => {
    mongoose.connect(url);

    const db = mongoose.connection;
    mongoose.Promise = global.Promise;
    // const opts = { url };
    const RedisStore = connect(session);
    // const MongoStore = connect(session);
    db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console
    db.on('connected', () => {
        // console.log('connected:');
    });
    db.on('open', () => {
        // we're connected!
        // console.log('connected to a');
    });
    db.once('open', () => {
        // we're connected!
        // console.log('connected to b');
    });
    db.once('disconnected', () => {
        // we're connected!
        // console.log('disconnected');
    });

    return session({
        secret: 'slomo',
        saveUninitialized: false,
        resave: false, // need to touch and then can use false as the value
        store: new RedisStore({ client: redisClient })
        // store: new MongoStore(opts)
    });
};
