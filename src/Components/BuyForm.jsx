import React from 'react';

export default class BuyForm extends React.Component {
  state = {
    productsReview: [],
    total: 0,
  }

  componentDidMount = () => {
    const ProductList = JSON.parse(localStorage.getItem('cart'));
    this.SetProductsReview(ProductList);
  }

  SetProductsReview = (ProductList) => {
    this.setState({ productsReview: [...ProductList] }, () => {
      const total = ProductList.reduce((prev, actual) => {
        prev += actual.price;
        return Math.round(Math.ceil(prev));
      }, 0);
      this.setState({ total });
    });
  }

  render() {
    const { productsReview, total } = this.state;
    return (
      <section>
        <h1>Finalização de Compra</h1>
        <div>
          <h2>Seus Produtos</h2>
          {
            productsReview.map((product, i) => (
              <div key={ i }>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.title }</p>
                <p>{ `Produto ${i + 1}` }</p>
                <p>{ `R$${product.price}` }</p>
              </div>
            ))
          }
          <p>{ `Total: R$${total}` }</p>
        </div>
        <form>
          <input
            type="text"
            name="nome-completo"
            id="nome-completo"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="tel"
            name="telefone"
            id="telefone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="cep"
            id="cep"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="endereço"
            id="endereço"
            data-testid="checkout-address"
          />
        </form>
      </section>
    );
  }
}
