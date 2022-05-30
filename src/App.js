import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';
import Product from './Components/Product';
import BuyForm from './Components/BuyForm';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            component={ ProductList }
          />
          <Route path="/cart" component={ Cart } />
          <Route path="/Product/:id" component={ Product } />
          <Route path="/buyForm" component={ BuyForm } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
