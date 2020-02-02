import Queue from 'bull';
import Filter from 'bad-words';
import Model from '../../api/reviews/model';

const filter = new Filter();
const reviewQueue = new Queue('review');

reviewQueue.process((job, done) => {
    // can be some other api
    const description = filter.clean(job.data.description);
    const isValid = description.includes('*');
    Model.findOneAndUpdate(
        {
            _id: job.data._id // eslint-disable-line no-underscore-dangle
        },
        {
            description,
            status: isValid ? 'rejected' : 'accepted'
        }
    )
        .then((res) => {
            done(null, res);
        })
        .catch(done);
});

export default reviewQueue;
