import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import auth from '../../api/auth/api';
import { Context } from '../../api/auth/context';

const Header = () => {
    const history = useHistory();

    const { isLogged, setSession } = useContext(Context);

    React.useEffect(() => {
        if (!isLogged) {
            history.push('/login');
        }
    }, []);

    const logout = React.useCallback(() => {
        auth.logout().then(() => {
            setSession('');
            history.push('/login');
        });
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                {
                    isLogged && (
                        <Button onClick={logout} color="inherit">
                            Logout
                        </Button>
                    )
                }
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {};

export default Header;
