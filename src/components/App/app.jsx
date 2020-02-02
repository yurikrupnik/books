import React from 'react';
import PropTypes from 'prop-types';
import Providers from './providers';
// import { Provider } from '../contexts/themes/index'; // todo change to auth
// import { Provider as AuthProvider } from '../contexts/auth';
import apiProviders from '../../api/providers';
import Layout from './layout';

const App = ({ routes }) => (
    <Providers providers={apiProviders}>
        <Layout routes={routes} />
    </Providers>
);

App.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    // session: PropTypes.string.isRequired
};

export default App;
