import React, { useContext } from "react";
import StateContext from "../utils/store";
import { Alert } from 'reactstrap';

const FlashMessageView = () => {
  const { store, dispatch } = useContext(StateContext);
  const { flashMessage } = store;

  setTimeout(() => {
    dispatch({ type: "setFlashMessage", data: null });
  }, 3000);

  return (
    <Alert color="dark" style={{marginBottom: "0px"}}>
      {flashMessage}
    </Alert>
  );
};

export default FlashMessageView;
