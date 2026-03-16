import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <span className="navbar-brand">AgriSense Admin</span>

        <div>
          <Link className="btn btn-outline-light me-2" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-outline-light me-2" to="/farmers">
            Farmers
          </Link>

          <Link className="btn btn-outline-light" to="/crops">
            Crops
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;