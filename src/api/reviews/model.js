import mongoose, { Schema } from 'mongoose';
import { dbModel } from './config';

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        index: true
    },
    book: {
        type: String,
        required: true,
        ref: 'Books',
        index: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        default: 'submitted',
        enum: ['submitted', 'accepted', 'rejected']
    },
    description: {
        type: String,
        default: ''
    }
});

const Model = mongoose.model(dbModel, schema);

Model.find({}).then((res) => {
    if (!res.length) {
        new Model({
            user: '5e330a5a74f7a11d5aabf2b5'
        }).save();
    }
});

export default Model;
export { schema };
