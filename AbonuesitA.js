import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Abonuesit = () => {
  const [abonuesit, setAbonuesit] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentAbonues, setCurrentAbonues] = useState({
    id: '', 
    emri: '',
    mbiemri: '',
    email: '',
    dataRegjistrimit: '',
    statusi: 'aktiv',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 1) {
      navigate('/login');
    } else {
      loadAbonuesit();
    }
  }, [navigate]);

  const loadAbonuesit = async () => {
    try {
      const response = await API.get('/Abonuesi');

      // Nëse backend e kthen "_id", konvertoje në "id"
      const data = response.data.map((item) => ({
        ...item,
        id: item._id || item.id, // përdor _id nëse ekziston
      }));

      setAbonuesit(data);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Gabim gjatë marrjes së të dhënave.');
    }
  };

  const handleSave = async () => {
    try {
      if (currentAbonues.id) {
        await API.put(`/Abonuesi/${currentAbonues.id}`, currentAbonues);
        setMessage('Abonuesi u përditësua me sukses.');
      } else {
        await API.post('/Abonuesi', currentAbonues);
        setMessage('Abonuesi u shtua me sukses.');
      }
      setShowModal(false);
      loadAbonuesit();
    } catch (error) {
      console.error('Gabim gjatë ruajtjes:', error);
      setMessage('Gabim gjatë ruajtjes së abonuesit.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që dëshironi ta fshini këtë abonues?')) {
      try {
        await API.delete(`/Abonuesi/${id}`);
        setMessage('Abonuesi u fshi me sukses.');
        loadAbonuesit();
      } catch (error) {
        console.error('Gabim gjatë fshirjes:', error);
        setMessage('Gabim gjatë fshirjes së abonuesit.');
      }
    }
  };

  const openModal = (abonues = {
    id: '', // tash id është string
    emri: '',
    mbiemri: '',
    email: '',
    dataRegjistrimit: '',
    statusi: 'aktiv',
  }) => {
    setCurrentAbonues(abonues);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Menaxhimi i Abonuesve</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto Abonues
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Mbiemri</th>
              <th>Email</th>
              <th>Data Regjistrimit</th>
              <th>Statusi</th>
              <th>Veprime</th>
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
                <td>
                  <Button variant="warning" className="me-2" onClick={() => openModal(item)}>
                    Përditëso
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Fshij
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentAbonues.id ? 'Edito Abonues' : 'Shto Abonues'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <Form>
          


            <Form.Group className="mb-3">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={currentAbonues.emri}
                onChange={(e) =>
                  setCurrentAbonues({ ...currentAbonues, emri: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mbiemri</Form.Label>
              <Form.Control
                type="text"
                value={currentAbonues.mbiemri}
                onChange={(e) =>
                  setCurrentAbonues({ ...currentAbonues, mbiemri: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentAbonues.email}
                onChange={(e) =>
                  setCurrentAbonues({ ...currentAbonues, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data Regjistrimit</Form.Label>
              <Form.Control
                type="date"
                value={
                  currentAbonues.dataRegjistrimit
                    ? currentAbonues.dataRegjistrimit.substring(0, 10)
                    : ''
                }
                onChange={(e) =>
                  setCurrentAbonues({
                    ...currentAbonues,
                    dataRegjistrimit: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Statusi</Form.Label>
              <Form.Control
                type="text"
                value={currentAbonues.statusi}
                onChange={(e) =>
                  setCurrentAbonues({ ...currentAbonues, statusi: e.target.value })
                }
                placeholder="Shkruaj statusin"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Mbyll
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Ruaj
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Abonuesit;
