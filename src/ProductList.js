import React from 'react';

class ProductList extends React.Component {
  state = {
    productList: [],
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <input type="text" />
        {productList.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </div>
    );
  }
}

export default ProductList;
