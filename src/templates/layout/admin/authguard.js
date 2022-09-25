import React from 'react'
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../../context/global-context'

const AuthGuard = () => {
    const context = React.useContext(GlobalContext);
    let currentUser = {};
    if (context.signedIn) currentUser = context.state.session;
    else currentUser = JSON.parse(localStorage.getItem('user'));
    const role = currentUser ? currentUser.role : '';
    const navigate = useNavigate();
    React.useEffect(() => {
        const func = () => {
            if (role !== 'admin')
                navigate('/');
        }
        func()
    }, [role]);
    return (<></>)
}

export default AuthGuard;