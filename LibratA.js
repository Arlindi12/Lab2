import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Librat = () => {
  const [librat, setLibrat] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLiber, setCurrentLiber] = useState({
    liberId: 0,
    titulli: '',
    autori: '',
    isbn: '',
    kategoriId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 1) {
      navigate('/login');
    } else {
      loadLibrat();
    }
  }, [navigate]);

  const loadLibrat = async () => {
    try {
      const response = await API.get('/Librat/Get');
      setLibrat(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Nuk mund të lexohen të dhënat.');
    }
  };

  const openModal = (liber = {
    liberId: 0,
    titulli: '',
    autori: '',
    isbn: '',
    kategoriId: ''
  }) => {
    setCurrentLiber(liber);
    setIsEditing(!!liber.liberId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentLiber({
      liberId: 0,
      titulli: '',
      autori: '',
      isbn: '',
      kategoriId: ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setCurrentLiber({ ...currentLiber, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await API.put('/Librat/Update', currentLiber);
        setMessage('Libri u përditësua me sukses!');
      } else {
        await API.post('/Librat/Add', currentLiber);
        setMessage('Libri u shtua me sukses!');
      }
      closeModal();
      loadLibrat();
    } catch (error) {
      console.error(error);
      setMessage('Gabim gjatë ruajtjes së të dhënave.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që doni ta fshini këtë libër?')) {
      try {
        await API.delete(`/Librat/${id}`);
        setMessage('Libri u fshi me sukses!');
        loadLibrat();
      } catch (error) {
        console.error(error);
        setMessage('Gabim gjatë fshirjes së librit.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Menaxhimi i Librave</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto Liber
        </Button>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulli</th>
              <th>Autori</th>
              <th>ISBN</th>
              <th>Kategoria ID</th>
              <th>Veprime</th>
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
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openModal(libri)}
                    className="me-2"
                  >
                    Përditëso
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(libri.liberId)}
                  >
                    Fshi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edito Liber' : 'Shto Liber'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titulli</Form.Label>
              <Form.Control
                type="text"
                name="titulli"
                value={currentLiber.titulli}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Autori</Form.Label>
              <Form.Control
                type="text"
                name="autori"
                value={currentLiber.autori}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                name="isbn"
                value={currentLiber.isbn}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategoria ID</Form.Label>
              <Form.Control
                type="number"
                name="kategoriId"
                value={currentLiber.kategoriId}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Mbyll
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? 'Përditëso' : 'Shto'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default Librat;
