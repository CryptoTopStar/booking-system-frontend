import React, { lazy, Suspense } from 'react'
import _ from 'lodash'
import GlobalContext from './global-context';
import AuthService from "../services/auth";

const Progress = lazy(() => import('../components/Progress'));

// Global State Settings
const initialState = {
    signedIn: false,
    processing: false,
    session: {}
};

const initState = () => {
    let state = JSON.parse(localStorage.getItem('user'));
    if (state == null)
        return initialState;
    else
        return {
            signedIn: true,
            processing: false,
            session: state,
        }
}

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = React.useState(initialState);
    const updateState = value => {
        setState({ ...state, ...value })
    };

    const startProcess = () => {
        setState({ ...state, processing: true })
    };

    const endProcess = () => {
        setState({ ...state, processing: false })
    };

    const global = {
        state,
        updateState,
        startProcess,
        endProcess,
    }

    React.useEffect(() => {
        async function checkLogin() {
            await AuthService.getUser()
                .then(user => {
                    if (user !== null) {
                        setState(prevState => ({
                            ...prevState,
                            signedIn: true,
                            session: user,
                        }))
                    }
                })
                .catch(() => {
                    setState({ ...initialState })
                })
        }
        checkLogin()
    }, []);

    // React.useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(state))
    // }, [state]);

    return (
        <GlobalContext.Provider
            value={global}
        >
            {/*  processing start */}
            <Suspense fallback={<></>}>
                <Progress processing={state.processing} />
            </Suspense>
            {/*  processing end */}
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalStateProvider, initialState }