import { Route, Routes } from 'react-router-dom';
import App from '../App.jsx';
import Home1 from '../Home1.jsx';
import Home2 from '../Home2.jsx';
import Home3 from '../Home3.jsx';

// Page Not Found component
const PageNotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home1" element={<Home1 />} />
      <Route path="home2" element={<Home2 />} />
      <Route path="home3" element={<Home3 />} />
      {/* Page Not Found route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;