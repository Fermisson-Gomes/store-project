import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';
import Product from './Components/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ ProductList } />
        <Route path="/cart" component={ Cart } />
        <Route path="/Product/:id" component={ Product } />
      </BrowserRouter>
    </div>
  );
}

export default App;
