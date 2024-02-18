import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,  Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={"sign-in"} element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
);