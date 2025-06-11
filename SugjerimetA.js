import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Sugjerimet = () => {
  const [sugjerimet, setSugjerimet] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentSugjerim, setCurrentSugjerim] = useState({
    id: '',
    titulli: '',
    autori: '',
    kategori: '',
    pershkrimi: '',
    sugjeruarNga: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);
    if (userRoleId !== 1) {
      navigate('/login');
    } else {
      loadSugjerimet();
    }
  }, [navigate]);

  const loadSugjerimet = async () => {
    try {
      const response = await API.get('/Sugjerimi');
      const data = response.data.map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setSugjerimet(data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së të dhënave:', error);
      setMessage('Gabim gjatë marrjes së të dhënave.');
    }
  };

  const handleSave = async () => {
    try {
      if (currentSugjerim.id) {
        await API.put(`/Sugjerimi/${currentSugjerim.id}`, currentSugjerim);
        setMessage('Sugjerimi u përditësua me sukses.');
      } else {
        await API.post('/Sugjerimi', currentSugjerim);
        setMessage('Sugjerimi u shtua me sukses.');
      }
      setShowModal(false);
      loadSugjerimet();
    } catch (error) {
      console.error('Gabim gjatë ruajtjes:', error);
      setMessage('Gabim gjatë ruajtjes së sugjerimit.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që dëshironi ta fshini këtë sugjerim?')) {
      try {
        await API.delete(`/Sugjerimi/${id}`);
        setMessage('Sugjerimi u fshi me sukses.');
        loadSugjerimet();
      } catch (error) {
        console.error('Gabim gjatë fshirjes:', error);
        setMessage('Gabim gjatë fshirjes së sugjerimit.');
      }
    }
  };

  const openModal = (sugjerim = {
    id: '',
    titulli: '',
    autori: '',
    kategori: '',
    pershkrimi: '',
    sugjeruarNga: '',
    email: '',
  }) => {
    setCurrentSugjerim(sugjerim);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Menaxhimi i Sugjerimeve</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto Sugjerim
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulli</th>
              <th>Autori</th>
              <th>Kategoria</th>
              <th>Përshkrimi</th>
              <th>Sugjeruar Nga</th>
              <th>Email</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {sugjerimet.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.titulli}</td>
                <td>{item.autori}</td>
                <td>{item.kategori}</td>
                <td>{item.pershkrimi}</td>
                <td>{item.sugjeruarNga}</td>
                <td>{item.email}</td>
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
            {currentSugjerim.id ? 'Edito Sugjerim' : 'Shto Sugjerim'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titulli</Form.Label>
              <Form.Control
                type="text"
                value={currentSugjerim.titulli}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, titulli: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Autori</Form.Label>
              <Form.Control
                type="text"
                value={currentSugjerim.autori}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, autori: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                type="text"
                value={currentSugjerim.kategori}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, kategori: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Përshkrimi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentSugjerim.pershkrimi}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, pershkrimi: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sugjeruar Nga</Form.Label>
              <Form.Control
                type="text"
                value={currentSugjerim.sugjeruarNga}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, sugjeruarNga: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentSugjerim.email}
                onChange={(e) =>
                  setCurrentSugjerim({ ...currentSugjerim, email: e.target.value })
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
            Ruaj
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Sugjerimet;
