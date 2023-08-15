import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Import your Redux store
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Wrap with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
