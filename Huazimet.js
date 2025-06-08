import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Huazimet = () => {
  const [huazimet, setHuazimet] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 2) {
      navigate('/login');
    } else {
      loadHuazimet();
    }
  }, [navigate]);

  const loadHuazimet = async () => {
    try {
      const response = await API.get('/Huazimet/Get');
      setHuazimet(response.data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së të dhënave:', error);
      setMessage('Nuk u arrit të lexohen të dhënat nga serveri.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Lista e Huazimeve</h2>
        {message && <Alert variant="danger">{message}</Alert>}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Users ID</th>
              <th>Liber ID</th>
              <th>Data e Huazimit</th>
              <th>Data e Kthimit</th>
            </tr>
          </thead>
          <tbody>
            {huazimet.map((item) => (
              <tr key={item.huazimId}>
                <td>{item.huazimId}</td>
                <td>{item.usersId}</td>
                <td>{item.liberId}</td>
                <td>{item.dataHuazimit}</td>
                <td>{item.dataKthimit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default Huazimet;
