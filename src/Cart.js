import React from 'react';

class Cart extends React.Component {
  state = {
    cartArray: [],
  }

  componentDidMount = () => {
    this.getItemsFromLocalStorage();
  }

  getItemsFromLocalStorage = () => {
    const itemsList = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cartArray: [...itemsList] });
  }

  render() {
    const { cartArray } = this.state;
    return (
      <div>
        {cartArray.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )
          : (
            <div>
              {
                cartArray.map(({ thumbnail, title, price, id }, i) => (
                  <div key={ i }>
                    <img src={ thumbnail } alt={ title } />
                    <p data-testid="shopping-cart-product-name">{ title }</p>
                    <p>{ price }</p>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      { localStorage.getItem(id) }
                    </p>
                  </div>
                ))
              }
            </div>
          )}
      </div>
    );
  }
}

export default Cart;
