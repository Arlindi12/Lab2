import React, { useEffect, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const LibratRead = () => {
  const [librat, setLibrat] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 2) {
      navigate('/login');
    } else {
      loadLibrat();
    }
  }, [navigate]);

  const loadLibrat = async () => {
    try {
      const response = await API.get('/Librat/Get');
      setLibrat(response.data);
    } catch (err) {
      console.error(err);
      setError('Nuk mund të lexohen të dhënat e librave.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista e Librave</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulli</th>
              <th>Autori</th>
              <th>ISBN</th>
              <th>Kategoria ID</th>
            </tr>
          </thead>
          <tbody>
            {librat.map((libri) => (
              <tr key={libri.liberId}>
                <td>{libri.liberId}</td>
                <td>{libri.titulli}</td>
                <td>{libri.autori}</td>
                <td>{libri.isbn}</td>
                <td>{libri.kategoriId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default LibratRead;
