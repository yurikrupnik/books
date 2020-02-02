import mongoose, { Schema } from 'mongoose';
import { dbModel } from './config';

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Model = mongoose.model(dbModel, schema);

Model.find({}).then((res) => {
    if (!res.length) {
        new Model({
            name: 'actions'
        }).save();
    }
});

export default Model;
export { schema };
