import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Library from './pages/Library';
import Album from './pages/Album';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route to={ '/' } element={ <Layout /> } >
        <Route index element={ <Landing /> } />
        <Route path={ '/library' } element={ <Library /> } />
        <Route path={ '/album/:slug' } element={ <Album /> } />
      </Route>
    </Routes>
  );
};

export default App;
