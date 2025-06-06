import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Abonuesit = () => {
  const [abonuesit, setAbonuesit] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 2) {
      navigate('/login');
    } else {
      loadAbonuesit();
    }
  }, [navigate]);

  const loadAbonuesit = async () => {
    try {
      const response = await API.get('/Abonuesi');
      const data = response.data.map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setAbonuesit(data);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Gabim gjatë marrjes së të dhënave.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista e Abonuesve</h2>
        {message && <Alert variant="info">{message}</Alert>}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
              <th>Data Regjistrimit</th>
              <th>Statusi</th>
            </tr>
          </thead>
          <tbody>
            {abonuesit.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.emri}</td>
                <td>{item.mbiemri}</td>
                <td>{item.email}</td>
                <td>{item.dataRegjistrimit ? item.dataRegjistrimit.substring(0, 10) : ''}</td>
                <td>{item.statusi}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default Abonuesit;
