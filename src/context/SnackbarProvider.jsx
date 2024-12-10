import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    const [state, setState] = React.useState({
        open: false,
        Transition: Slide,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSnackbarOpen = () => {
        setState({
            open: true,
            Transition: SlideTransition,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return (
        <SnackbarContext.Provider value={{
            handleSnackbarOpen,
            message,
            setMessage,
            loading,
            setLoading,
        }}>
            <div>
                <Snackbar
                    open={state.open}
                    onClose={handleClose}
                    TransitionComponent={state.Transition}
                    message={message}
                    key={state.Transition.name}
                    autoHideDuration={6000}
                    action={action}
                />
            </div>
            {children}
        </SnackbarContext.Provider>
    )
}