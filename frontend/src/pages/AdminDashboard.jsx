import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminDashboard() {
  // ----- FARMERS -----
  const [farmers, setFarmers] = useState([]);
  const [farmerName, setFarmerName] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("");
  const [farmerCrop, setFarmerCrop] = useState("");
  const [editingFarmerId, setEditingFarmerId] = useState(null);

  // ----- CROPS -----
  const [crops, setCrops] = useState([]);
  const [cropName, setCropName] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [expectedYield, setExpectedYield] = useState("");
  const [editingCropId, setEditingCropId] = useState(null);

  // ----- PAGINATION & SEARCH -----
  const [farmerPage, setFarmerPage] = useState(1);
  const [cropPage, setCropPage] = useState(1);
  const rowsPerPage = 5;

  const [farmerSearch, setFarmerSearch] = useState("");
  const [cropSearch, setCropSearch] = useState("");

  useEffect(() => {
    fetchCrops(); // fetch crops first for dropdown
    fetchFarmers();
  }, []);

  // ----- FETCH DATA -----
  const fetchFarmers = async () => {
    try {
      const res = await API.get("/farmers");
      setFarmers(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchCrops = async () => {
    try {
      const res = await API.get("/crops");
      setCrops(res.data);
    } catch (err) { console.error(err); }
  };

  // ----- FARMERS CRUD -----
  const addFarmer = async (e) => {
    e.preventDefault();
    try {
      await API.post("/farmers", { name: farmerName, location: farmerLocation, crop: farmerCrop });
      setFarmerName("");
      setFarmerLocation("");
      setFarmerCrop("");
      fetchFarmers();
    } catch (err) { console.error(err); }
  };

  const editFarmer = (farmer) => {
    setFarmerName(farmer.name);
    setFarmerLocation(farmer.location);
    setFarmerCrop(farmer.crop);
    setEditingFarmerId(farmer.id);
  };

  const updateFarmer = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/farmers/${editingFarmerId}`, { name: farmerName, location: farmerLocation, crop: farmerCrop });
      setEditingFarmerId(null);
      setFarmerName("");
      setFarmerLocation("");
      setFarmerCrop("");
      fetchFarmers();
    } catch (err) { console.error(err); }
  };

  const deleteFarmer = async (id) => {
    try { await API.delete(`/farmers/${id}`); fetchFarmers(); } catch (err) { console.error(err); }
  };

  // ----- CROPS CRUD -----
  const addCrop = async (e) => {
    e.preventDefault();
    try {
      await API.post("/crops", { name: cropName, season: cropSeason, expected_yield: expectedYield });
      setCropName("");
      setCropSeason("");
      setExpectedYield("");
      fetchCrops();
    } catch (err) { console.error(err); }
  };

  const editCrop = (crop) => {
    setCropName(crop.name);
    setCropSeason(crop.season);
    setExpectedYield(crop.expected_yield);
    setEditingCropId(crop.id);
  };

  const updateCrop = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/crops/${editingCropId}`, { name: cropName, season: cropSeason, expected_yield: expectedYield });
      setEditingCropId(null);
      setCropName("");
      setCropSeason("");
      setExpectedYield("");
      fetchCrops();
    } catch (err) { console.error(err); }
  };

  const deleteCrop = async (id) => {
    try { await API.delete(`/crops/${id}`); fetchCrops(); } catch (err) { console.error(err); }
  };

  // ----- FILTERED & PAGINATED DATA -----
  const filteredFarmers = farmers.filter(f =>
    f.name.toLowerCase().includes(farmerSearch.toLowerCase())
  );
  const displayedFarmers = filteredFarmers.slice((farmerPage - 1) * rowsPerPage, farmerPage * rowsPerPage);

  const filteredCrops = crops.filter(c =>
    c.name.toLowerCase().includes(cropSearch.toLowerCase())
  );
  const displayedCrops = filteredCrops.slice((cropPage - 1) * rowsPerPage, cropPage * rowsPerPage);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>

        {/* ----- FARMERS SECTION ----- */}
        <div className="card p-3 mb-4">
          <h4>{editingFarmerId ? "Edit Farmer" : "Add Farmer"}</h4>
          <form onSubmit={editingFarmerId ? updateFarmer : addFarmer}>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Farmer Name"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Location"
                  value={farmerLocation}
                  onChange={(e) => setFarmerLocation(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  value={farmerCrop}
                  onChange={(e) => setFarmerCrop(e.target.value)}
                  required
                >
                  <option value="">Select Crop</option>
                  {crops.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <button className="btn btn-success">{editingFarmerId ? "Update" : "Add"}</button>
              </div>
            </div>
          </form>
        </div>

        <input
          className="form-control mb-2"
          placeholder="Search farmers..."
          value={farmerSearch}
          onChange={(e) => setFarmerSearch(e.target.value)}
        />

        <table className="table table-bordered mb-3">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Location</th><th>Crop</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedFarmers.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.location}</td>
                <td>{f.crop_name || "N/A"}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editFarmer(f)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteFarmer(f.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4">
          <button disabled={farmerPage === 1} onClick={() => setFarmerPage(farmerPage - 1)} className="btn btn-secondary me-2">Prev</button>
          <button disabled={farmerPage * rowsPerPage >= filteredFarmers.length} onClick={() => setFarmerPage(farmerPage + 1)} className="btn btn-secondary">Next</button>
        </div>

        {/* ----- CROPS SECTION ----- */}
        <div className="card p-3 mb-4">
          <h4>{editingCropId ? "Edit Crop" : "Add Crop"}</h4>
          <form onSubmit={editingCropId ? updateCrop : addCrop}>
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Crop Name"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Season"
                  value={cropSeason}
                  onChange={(e) => setCropSeason(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Expected Yield"
                  value={expectedYield}
                  onChange={(e) => setExpectedYield(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-success">{editingCropId ? "Update" : "Add"}</button>
              </div>
            </div>
          </form>
        </div>

        <input
          className="form-control mb-2"
          placeholder="Search crops..."
          value={cropSearch}
          onChange={(e) => setCropSearch(e.target.value)}
        />

        <table className="table table-bordered mb-3">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Season</th><th>Expected Yield</th><th>Created At</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedCrops.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.season}</td>
                <td>{c.expected_yield}</td>
                <td>{c.created_at}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editCrop(c)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCrop(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button disabled={cropPage === 1} onClick={() => setCropPage(cropPage - 1)} className="btn btn-secondary me-2">Prev</button>
          <button disabled={cropPage * rowsPerPage >= filteredCrops.length} onClick={() => setCropPage(cropPage + 1)} className="btn btn-secondary">Next</button>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;