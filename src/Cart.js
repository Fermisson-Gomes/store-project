import React from 'react';

class Cart extends React.Component {
  state = {
    arrayVazio: [],
  }

  render() {
    const { arrayVazio } = this.state;
    return (
      <div>

        {arrayVazio.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </div>
    );
  }
}

export default Cart;
