import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Kategorite = () => {
  const [kategorite, setKategorite] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentKategori, setCurrentKategori] = useState({
    kategoriId: 0,
    emri: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);

    if (userRoleId !== 1) {
      navigate('/login');
    } else {
      loadKategorite();
    }
  }, [navigate]);

  const loadKategorite = async () => {
    try {
      const response = await API.get('/Kategorite/Get'); // Ndrysho endpoint sipas API-së
      setKategorite(response.data);
    } catch (error) {
      console.error('Gabim gjatë ngarkimit të kategorive:', error);
      setMessage('Gabim gjatë ngarkimit të kategorive.');
    }
  };

  const handleSave = async () => {
    try {
      if (currentKategori.kategoriId) {
        await API.put('/Kategorite/Update', currentKategori); // Ndrysho sipas endpointit tënd
        setMessage('Kategoria u përditësua me sukses.');
      } else {
        await API.post('/Kategorite/Add', currentKategori); // Ndrysho sipas endpointit tënd
        setMessage('Kategoria u shtua me sukses.');
      }
      setShowModal(false);
      loadKategorite();
    } catch (error) {
      console.error('Gabim gjatë ruajtjes së kategorisë:', error);
      setMessage('Gabim gjatë ruajtjes së kategorisë.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që doni ta fshini këtë kategori?')) {
      try {
        await API.delete(`/Kategorite/${id}`); // Ndrysho sipas endpointit tënd
        setMessage('Kategoria u fshi me sukses.');
        loadKategorite();
      } catch (error) {
        console.error('Gabim gjatë fshirjes së kategorisë:', error);
        setMessage('Gabim gjatë fshirjes së kategorisë.');
      }
    }
  };

  const openModal = (kategori = { kategoriId: 0, emri: '' }) => {
    setCurrentKategori(kategori);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Menaxhimi i Kategorive</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto Kategori
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
      <th style={{ width: '15%' }}>ID</th> {/* Kolona Emri zgjerohet */}
      <th style={{ width: '55%' }}>Emri</th> {/* Kolona Emri zgjerohet */}
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {kategorite.map((kat) => (
              <tr key={kat.kategoriId}>
                <td>{kat.kategoriId}</td>
                <td>{kat.emri}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openModal(kat)}
                  >
                    Përditëso
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(kat.kategoriId)}
                  >
                    Fshi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal për Add/Edit */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentKategori.kategoriId ? 'Përditëso Kategori' : 'Shto Kategori'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Emri i Kategorisë</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shkruaj emrin"
                value={currentKategori.emri}
                onChange={(e) =>
                  setCurrentKategori({ ...currentKategori, emri: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Mbyll
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Ruaj Ndryshimet
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Kategorite;
