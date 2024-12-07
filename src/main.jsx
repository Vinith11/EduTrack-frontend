import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import ReactDOM from "react-dom/client";
import Home1 from './Home1.jsx';
import Home3 from './Home3.jsx';
import Home2 from './Home2.jsx';


// Define your Page Not Found component
const PageNotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home1" element={<Home1 />} />
      <Route path="home2" element={<Home2 />} />
      <Route path="home3" element={<Home3 />} />


            {/* Page Not Found route */}
            <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
