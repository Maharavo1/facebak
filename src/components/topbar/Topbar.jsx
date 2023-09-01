import React from "react";
import { Search } from "@mui/icons-material";
import "./topbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social Media</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Recherche ..."
            className="searchInput"
          />
        </div>
      </div>
      <div>
        <span className="profile"><Link to="/profile"> <img src="/assets/person/1.jpeg" alt="Profile" className="topbarImg" /> </Link></span>
        <Link to="/">
          <Button variant="danger" className="ml-2">
            Logout
          </Button>
        </Link>

        {/*  */}
      </div>
    </div>
  );
}
