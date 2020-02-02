import { createContext } from 'react';

const { Provider, Consumer } = createContext({
    user: null,
    isSignedIn: false
});

// export default createContext({
//     user: null,
//     isSignedIn: false
// });

export { Provider, Consumer };
