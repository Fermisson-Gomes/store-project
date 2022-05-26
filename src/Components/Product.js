import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
  state = {
    product: {},
    pictures: [],
    cartProducts: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    await this.getProductById(id);
  }

  getProductById = async (id) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const resultFetch = await fetch(url);
    const resultJSON = await resultFetch.json();
    this.setState({ product: resultJSON, pictures: resultJSON.pictures });
  }

  handleClickAddCart = async (product) => {
    // const url = `https://api.mercadolibre.com/items/${id}`;
    // const resultFetch = await fetch(url);
    // const resultJSON = await resultFetch.json();
    this.setState(({ cartProducts }) => ({
      cartProducts: [...cartProducts, product],
    }), () => {
      const getFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
      console.log(getFromLocalStorage);
      if (getFromLocalStorage.some((item) => item.id === product.id)) {
        console.log('if');
        let count = Number(localStorage.getItem(product.id));
        localStorage.setItem(product.id, count += 1);
      } else {
        console.log('else');
        const newArrayProducts = [...getFromLocalStorage, product];
        localStorage.setItem('cart', JSON.stringify(newArrayProducts));
        localStorage.setItem(product.id, 1);
      }
    });
  }

  render() {
    const { product: { title, price }, pictures } = this.state;
    const { product } = this.state;
    return (
      <div>
        <Link
          to="/cart"
        >
          <button data-testid="shopping-cart-button" type="button">Carrinho</button>
        </Link>
        <h3 data-testid="product-detail-name">{ title }</h3>
        {
          pictures.map(({ url, id }) => (
            <img src={ url } alt={ id } key={ id } />
          ))
        }
        <p>{ price }</p>
        <button type="button" onClick={ () => this.handleClickAddCart(product) } data-testid="product-detail-add-to-cart">Adicionar ao carrinho</button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
