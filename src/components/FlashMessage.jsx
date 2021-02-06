import React, { useContext } from "react";
import StateContext from "../utils/store";

const FlashMessageView = () => {
  const { store, dispatch } = useContext(StateContext);
  const { flashMessage } = store;

  setTimeout(() => {
    dispatch({ type: "setFlashMessage", data: null });
  }, 10000);

  return (
    <section>
      <h4 className="heading-colors">{flashMessage}</h4>
    </section>
  );
};

export default FlashMessageView;
