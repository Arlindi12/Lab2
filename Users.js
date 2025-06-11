import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userId: 0,
    fullName: '',
    email: '',
    phone: '',
    password: '',
    roleId: 2
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);

    if (userRoleId !== 1) {
      navigate('/login');
    } else {
      loadUsers();
    }
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const response = await API.get('/Account/GetAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      setMessage('Error loading users.');
    }
  };

  const handleSave = async () => {
    try {
      if (currentUser.userId) {
        // Update User
        await API.put('/Account/UpdateUser', currentUser);
        setMessage('User updated successfully.');
      } else {
        // Add User
        await API.post('/Account/Registration', currentUser);
        setMessage('User added successfully.');
      }
      setShowModal(false);
      loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      setMessage('Error saving user.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/Account/DeleteUser/${id}`);
        setMessage('User deleted successfully.');
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setMessage('Error deleting user.');
      }
    }
  };

  const openModal = (user = { userId: 0, fullName: '', email: '', phone: '', password: '', roleId: 2 }) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>User Management</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Button onClick={() => openModal()} variant="primary" className="mb-3">
          Shto User
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr.userId}>
                <td>{usr.userId}</td>
                <td>{usr.fullName}</td>
                <td>{usr.email}</td>
                <td>{usr.phone}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => openModal(usr)}
                  >
                    Përditëso
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(usr.userId)}
                  >
                    Fshi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentUser.userId ? 'Edit User' : 'Add User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={currentUser.fullName}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, fullName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={currentUser.phone}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={currentUser.password}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Users;
