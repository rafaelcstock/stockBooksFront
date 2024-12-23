import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './componentes/Header';
import Home from './rotas/Home';
import Favoritos from './rotas/favoritos';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-x: hidden; 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
  list-style: none;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/favoritos' element={< Favoritos />} />
        <Route path='/categorias' element={""} />
        <Route path='/estante' element={""} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
