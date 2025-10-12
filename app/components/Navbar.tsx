import React from 'react';
import { Link } from 'react-router';
const Navbar = () => {
  return (
    <nav className="navbar">
    <Link to="/">
       <p className="text-2xl font-bold text-black">RESUMIO</p>
    </Link>
    <Link to="/upload" className="primary-button w-fit">
       Upload Resume
    </Link>
    </nav>
  )
}
export default Navbar

// Ensure this component is rendered inside a parent that places it at the top,
// e.g. render it as the first child of your root layout or App component.
