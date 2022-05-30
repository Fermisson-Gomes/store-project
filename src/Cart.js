import React from 'react';

class Cart extends React.Component {
  state = {
    cartArray: [],
  }

  componentDidMount = () => {
    this.getItemsFromLocalStorage();
  }

  quantityHandler = (event, operacao, quantidadeMax) => {
    const { name } = event.target;
    const { cartArray } = this.state;
    let quantity = localStorage.getItem(name);
    if (parseInt(quantity, 10) === 1 && operacao === 'menos') {
      return false;
    }
    if (parseInt(quantity, 10) === parseInt(quantidadeMax, 10) && operacao === 'mais') {
      return false;
    }
    if (operacao === 'mais') {
      quantity = parseInt(quantity, 10) + 1;
    } if (operacao === 'menos') {
      quantity = parseInt(quantity, 10) - 1;
    }
    localStorage.setItem(name, quantity);
    const cartMap = cartArray.map((produto) => {
      if (produto.id === name) {
        produto.quantity = quantity;
        return produto;
      }
      return produto;
    });
    this.setState({ cartArray: cartMap });
  }

  getItemsFromLocalStorage = () => {
    const itemsList = JSON.parse(localStorage.getItem('cart'));
    const novoArray = itemsList.map((item) => {
      const quantidade = localStorage.getItem(item.id);
      item.quantity = quantidade;
      return item;
    });
    this.setState({ cartArray: novoArray });
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
                cartArray.map((
                  { thumbnail, title, price, quantity, id,
                    available_quantity: quantidadeDisponivel },
                  index,
                ) => (
                  <div key={ index }>
                    <img src={ thumbnail } alt={ title } />
                    <p data-testid="shopping-cart-product-name">{ title }</p>
                    <p>
                      { `R$${price}` }
                    </p>
                    <p>
                      <button
                        type="button"
                        name={ id }
                        data-testid="product-decrease-quantity"
                        onClick={ (event) => {
                          this.quantityHandler(event, 'menos', quantidadeDisponivel);
                        } }
                      >
                        -

                      </button>
                      <span data-testid="shopping-cart-product-quantity">{quantity}</span>
                      <button
                        type="button"
                        name={ id }
                        data-testid="product-increase-quantity"
                        onClick={ (event) => {
                          this.quantityHandler(event, 'mais', quantidadeDisponivel);
                        } }
                      >
                        +

                      </button>

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
