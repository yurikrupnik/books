import Loadable from './Loadable';

const Header = Loadable({
    loader: () => import(/* webpackChunkName: "header" */ './Header')
});

const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ '../api/auth/container')
});
const Dashboard = Loadable({
    loader: () => import(/* webpackChunkName: "dashboard" */ './Dashboard')
});

const routes = [
    {
        path: '/',
        component: Header,
        key: 'header'
    },
    {
        path: '/',
        component: Dashboard,
        exact: true,
        key: 'dashboard'
    },
    {
        path: '/login',
        component: Login,
        key: 'login'
    }
];

export default routes;
