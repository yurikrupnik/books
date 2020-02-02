import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Spinner from '../Spinner';

const Item = (props) => {
    const { item, handleClick } = props;

    const handleSelected = React.useCallback(() => {
        handleClick(item);
    }, [item]);

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <div>{item.name}</div>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button size="small" onClick={handleSelected} color="primary">
                    add review
                </Button>
            </Grid>
        </Grid>
    );
};

Item.propTypes = {
    handleClick: PropTypes.func.isRequired,
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired
};

const List = (props) => {
    const {
        data, loading, handleReview, setSelectedReview
    } = props;

    const handleSelected = React.useCallback(
        (book) => {
            setSelectedReview(book);
            handleReview();
        },
        [setSelectedReview]
    );

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            {data.map((v) => (
                <Item item={v} key={v._id} handleClick={handleSelected} />
            ))}
        </div>
    );
};

List.propTypes = {
    handleReview: PropTypes.func.isRequired,
    setSelectedReview: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default List;
