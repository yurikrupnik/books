import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import api from '../api';

const ReviewsProvider = (props) => {
    const { children } = props;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);

    const fetch = useCallback((params) => {
        setLoading(true);
        return api
            .fetch(params)
            .then((users) => {
                setData(users);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const create = useCallback((body) => {
        setLoading(true);
        return api
            .create(body)
            .then((res) => {
                console.log('res', res);
                // setData(users);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Context.Provider
            value={{
                loading,
                fetch,
                create,
                selected,
                data,
                setSelected
            }}
        >
            {children}
        </Context.Provider>
    );
};

ReviewsProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default ReviewsProvider;
