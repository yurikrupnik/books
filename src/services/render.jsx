import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React, { isValidElement } from 'react';

const render = (App, routes) => (req, res) => {
    const context = {
        sessions: req.session.id
    };
    const initState = {
        session: req.isAuthenticated() ? req.session.id : null,
        user: req.user ? req.user._id : ''
    };
    const { url } = context;
    const title = 'mus';
    // delete if not preparation for ssr not needed - fast reload
    const html = isValidElement(App)
        ? renderToString((
            <StaticRouter context={context}>
                <App routes={routes} />
            </StaticRouter>
        ))
        : '';
    const state = {
        title,
        html,
        initState
    };
    return url ? res.redirect(301, url) : res.render('index', state);
};

export default render;
