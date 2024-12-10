import React, { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";

export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const [state, setState] = React.useState({
    error: false,
    message: '',
    open: false,
    Transition: Slide,
  });
  const [loading, setLoading] = useState(false);

  const handleSnackbarOpen = (message, error) => {
    setState({
        error: error,
        message,
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
    <SnackbarContext.Provider
      value={{
        handleSnackbarOpen,
        loading,
        setLoading,
      }}
    >
      <div>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          // message={message}
          key={state.Transition.name}
          autoHideDuration={6000}
          // action={action}
        >
          <Alert
            onClose={handleClose}
            severity={`${state.error ? 'error' : 'success'}`}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {state.message}
          </Alert>
        </Snackbar>
      </div>
      {children}
    </SnackbarContext.Provider>
  );
};
