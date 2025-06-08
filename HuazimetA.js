import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Huazimet = () => {
  const [huazimet, setHuazimet] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentHuazim, setCurrentHuazim] = useState({
    huazimId: 0,
    usersId: '',
    liberId: '',
    dataHuazimit: '',
    dataKthimit: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 1) {
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
      console.error('Error loading data:', error);
      setMessage('Error loading data.');
    }
  };

  const handleSave = async () => {
    try {
      if (currentHuazim.huazimId) {
        await API.put('/Huazimet/Update', currentHuazim);
        setMessage('Huazimi u përditësua me sukses.');
      } else {
        await API.post('/Huazimet/Add', currentHuazim);
        setMessage('Huazimi u shtua me sukses.');
      }
      setShowModal(false);
      loadHuazimet();
    } catch (error) {
      console.error('Gabim gjatë ruajtjes:', error);
      setMessage('Gabim gjatë ruajtjes së huazimit.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që dëshironi ta fshini këtë huazim?')) {
      try {
        await API.delete(`/Huazimet/${id}`);
        setMessage('Huazimi u fshi me sukses.');
        loadHuazimet();
      } catch (error) {
        console.error('Gabim gjatë fshirjes:', error);
        setMessage('Gabim gjatë fshirjes së huazimit.');
      }
    }
  };

  const openModal = (huazim = {
    huazimId: 0,
    usersId: '',
    liberId: '',
    dataHuazimit: '',
    dataKthimit: '',
  }) => {
    setCurrentHuazim(huazim);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Menaxhimi i Huazimeve</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto Huazim
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Users ID</th>
              <th>Liber ID</th>
              <th>Data Huazimit</th>
              <th>Data Kthimit</th>
              <th>Veprime</th>
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
                <td>
                  <Button variant="warning" className="me-2" onClick={() => openModal(item)}>
                    Përditëso
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item.huazimId)}>
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
            {currentHuazim.huazimId ? 'Edito Huazim' : 'Shto Huazim'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Users ID</Form.Label>
              <Form.Control
                type="number"
                value={currentHuazim.usersId}
                onChange={(e) => setCurrentHuazim({ ...currentHuazim, usersId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Liber ID</Form.Label>
              <Form.Control
                type="number"
                value={currentHuazim.liberId}
                onChange={(e) => setCurrentHuazim({ ...currentHuazim, liberId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data Huazimit</Form.Label>
              <Form.Control
                type="date"
                value={currentHuazim.dataHuazimit}
                onChange={(e) => setCurrentHuazim({ ...currentHuazim, dataHuazimit: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data Kthimit</Form.Label>
              <Form.Control
                type="date"
                value={currentHuazim.dataKthimit}
                onChange={(e) => setCurrentHuazim({ ...currentHuazim, dataKthimit: e.target.value })}
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

export default Huazimet;
