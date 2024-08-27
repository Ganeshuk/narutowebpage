import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Adult from './Adult';
import English from './English';
import Movie from './Movie';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/english" element={<English />} />
        <Route path="/adult" element={<Adult />} />
      </Routes>
    </Router>
  );
}

export default App;
