import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Crops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await API.get("/crops");
      setCrops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Stats -----
  const totalCrops = crops.length;

  const totalExpectedYield = crops.reduce(
    (sum, crop) => sum + Number(crop.expected_yield || 0),
    0
  );

  const uniqueSeasons = [...new Set(crops.map(c => c.season))].length;

  return (
    <>
      <Navbar />

      <div className="card text-center p-3 bg-light border-success shadow-sm">
        <h2>Crops Overview</h2>

        <div className="row mt-3">

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>🌾 Total Crops</h5>
              <h3>{totalCrops}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>🌱 Expected Yield</h5>
              <h3>{totalExpectedYield} kg</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>Seasons Covered</h5>
              <h3>{uniqueSeasons}</h3>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Crops;