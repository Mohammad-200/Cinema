import React from "react";
import { ToastContainer } from "react-toastify";

function AppToastContainer() {
  return (
    <ToastContainer
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default AppToastContainer;
