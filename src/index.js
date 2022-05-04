import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./store/User-Context";
import { Error } from "./pages/Error";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path="*" element={<App/>} />
      <Route path="/404" exact element={<Error />}/>
    </Routes>
      
    </BrowserRouter>
  </UserContextProvider>
);
