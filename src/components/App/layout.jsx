import React from 'react';
import PropTypes from 'prop-types';
import Router from '../Router/index';

const Layout = ({ routes }) => (
    <>
        <Router routes={routes} />
    </>
);

Layout.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Layout;
