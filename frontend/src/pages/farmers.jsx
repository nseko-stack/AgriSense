import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Farmers() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await API.get("/farmers");
      setFarmers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Stats -----
  const totalFarmers = farmers.length;

  const farmersWithCrops = farmers.filter(f => f.crop).length;

  const uniqueLocations = [...new Set(farmers.map(f => f.location))].length;

  return (
    <>
      <Navbar />

      <div className="card text-center p-3 bg-light border-success shadow-sm">
        <h2>Farmers Overview</h2>

        <div className="row mt-3">

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>👨‍🌾 Total Farmers</h5>
              <h3>{totalFarmers}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>Locations Covered</h5>
              <h3>{uniqueLocations}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>Farmers Growing Crops</h5>
              <h3>{farmersWithCrops}</h3>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Farmers;