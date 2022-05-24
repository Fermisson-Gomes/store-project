import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={ ProductList } />
      </BrowserRouter>
    </div>
  );
}

export default App;
