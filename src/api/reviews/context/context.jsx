import React from 'react';

export default React.createContext({
    data: [],
    loading: false,
    selected: null,
    fetch: () => {}
});
