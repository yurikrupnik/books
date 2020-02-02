import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Cookie from 'js-cookie';
import { Provider } from './context';

const AuthProvider = (props) => {
    const { children } = props;
    // const [session] = useState(global.window.appData.session || global.window.cookie);
    console.log('logdfgs');
    return <Provider value={{}}>{children}</Provider>;
};

AuthProvider.defaultProps = {
    // session: ''
};

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
    // session: PropTypes.string
};

export default AuthProvider;
