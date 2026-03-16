import { useEffect, useState } from "react";
import API from "../services/api";


function Dashboard() {
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/";
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    const farmersRes = await API.get("/farmers");
    const cropsRes = await API.get("/crops");

    setFarmers(farmersRes.data);
    setCrops(cropsRes.data);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow p-3 text-center">
            <h5>Total Farmers</h5>
            <h3>{farmers.length}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3 text-center">
            <h5>Total Crops</h5>
            <h3>{crops.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;