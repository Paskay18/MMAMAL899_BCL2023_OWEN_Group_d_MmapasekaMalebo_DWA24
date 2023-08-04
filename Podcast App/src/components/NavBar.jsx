import React from "react";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="page-container" style={{ backgroundColor: "black" }}>
      <div className="container">
        <nav className="nav--bar">
          <div className="items">
            <ul className="row" style={{ listStyle: "none" }}>
              <li className="col">
                <Link to="/homeSort">
                  <button type="button" className="btn btn-outline-light">
                    Sort
                  </button>
                </Link>
              </li>
              <li className="col">
                <Link to="/homeSort">
                  <button type="button" className="btn btn-outline-light">
                    Search
                  </button>
                </Link>
              </li>
              <li className="col">
                <SignOut />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

