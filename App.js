import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import KategoriteA from './components/KategoriteA';
import Kategorite from './components/Kategorite';
import HuazimetA from './components/HuazimetA';
import Huazimet from './components/Huazimet';
import LibratA from './components/LibratA';
import Librat from './components/Librat';
import Contact from './components/Contact';
import Users from './components/Users';
import AbonuesitA from './components/AbonuesitA';
import Abonuesi from './components/Abonuesi';
import SugjerimetA from './components/SugjerimetA';
import Sugjerimet from './components/Sugjerimet';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/kategoriteA" element={<KategoriteA />} />
      <Route path="/kategorite" element={<Kategorite />} />
      <Route path="/huazimetA" element={<HuazimetA />} />
      <Route path="/huazimet" element={<Huazimet />} />
      <Route path="/libratA" element={<LibratA />} />
      <Route path="/librat" element={<Librat />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/users" element={<Users />} />
      <Route path="/abonuesitA" element={<AbonuesitA />} />
      <Route path="/abonuesi" element={<Abonuesi />} /> 
      <Route path="/sugjerimetA" element={<SugjerimetA />} />     
      <Route path="/sugjerimet" element={<Sugjerimet />} />


      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
