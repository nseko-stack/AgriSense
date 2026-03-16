import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import Farmers from "./pages/Farmers";
import Crops from "./pages/crops";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/crops" element={<Crops />} />
      </Routes>
    </Router>
  );
}

export default App;