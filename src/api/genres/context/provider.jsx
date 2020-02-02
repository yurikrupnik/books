import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import api from '../api';


const GeneresProvider = (props) => {
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
                return users;
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
                selected,
                data,
                setSelected
            }}
        >
            {children}
        </Context.Provider>
    );
};

GeneresProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default GeneresProvider;
