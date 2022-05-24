import React from 'react';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  state = {
    productList: [],
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <input type="text" />
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Cart</button>
        </Link>
        {productList.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </div>
    );
  }
}

export default ProductList;
