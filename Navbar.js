import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const userRoleId = localStorage.getItem('userRoleId');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = 'https://localhost:7254/api/Account/Logout';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.setItem('userRoleId', 0);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const adminNavItems = [
    { path: '/Home', label: 'Home' },
    { path: '/KategoriteA', label: 'Kategorite' },
    { path: '/HuazimetA', label: 'Huazimet' },
    { path: '/LibratA', label: 'Librat' },
    { path: '/AbonuesitA', label: 'Abonuesit' },
    { path: '/SugjerimetA', label: 'Sugjerimet' },
        { path: '/Users', label: 'Users' },
    { path: '/Contact', label: 'Contact' },
  ];

  const userNavItems = [
    { path: '/Home', label: 'Home' },
    { path: '/Kategorite', label: 'Kategorite' },
    { path: '/Huazimet', label: 'Huazimet' },
    { path: '/Librat', label: 'Librat' },
    { path: '/Abonuesi', label: 'Abonuesit' },
    { path: '/Sugjerimet', label: 'Sugjerimet' },
    { path: '/Contact', label: 'Contact' },
  ];

  const navItems = userRoleId === '1' ? adminNavItems : userNavItems;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar py-3">
      <div className="container">
        <a className="navbar-brand" href="/Home">LibraryManager</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.path} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a href="/Login" className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
