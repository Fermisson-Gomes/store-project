import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ ProductList } />
        <Route path="/cart" component={ Cart } />
      </BrowserRouter>
    </div>
  );
}

export default App;
