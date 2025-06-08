import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Kategorite = () => {
  const [kategorite, setKategorite] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);

    if (userRoleId !== 2) {
      navigate('/login');
    } else {
      loadKategorite();
    }
  }, [navigate]);

  const loadKategorite = async () => {
    try {
      const response = await API.get('/Kategorite/Get'); // Ndrysho endpoint sipas nevojës
      setKategorite(response.data);
    } catch (error) {
      console.error('Gabim gjatë ngarkimit të kategorive:', error);
      setMessage('Gabim gjatë ngarkimit të kategorive.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Kategoritë</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
            </tr>
          </thead>
          <tbody>
            {kategorite.map((kategoria) => (
              <tr key={kategoria.kategoriId}>
                <td>{kategoria.kategoriId}</td>
                <td>{kategoria.emri}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default Kategorite;
