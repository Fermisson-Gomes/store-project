import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import ProductReviewCard from './ProductReviewCard';

export default class Product extends React.Component {
  state = {
    product: {},
    pictures: [],
    cartProducts: [],
    userReview: [],
    productsCount: 0,
  }

  componentDidMount = async () => {
    if (!localStorage.getItem('userReview')) localStorage.setItem('userReview', '[]');
    const { match: { params: { id } } } = this.props;
    this.getUserReviewFromLs();
    this.getNumberInCart();
    await this.getProductById(id);
  }

  getNumberInCart() {
    const getFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    const products = getFromLocalStorage.map((item) => item.id);
    let soma = 0;
    products.forEach((product) => {
      const number = Number(localStorage.getItem(product));
      soma += number;
    });
    this.setState({ productsCount: soma });
  }

  getUserReviewFromLs = () => {
    const getValueFromLS = JSON.parse(localStorage.getItem('userReview'));
    this.setState({
      userReview: [...getValueFromLS],
    });
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
      this.getNumberInCart();
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { email, textArea, avaliacao } = this.state;

    const userReviewObj = {
      email,
      textArea,
      avaliacao,
    };

    const getFromLocalStorage = JSON.parse(localStorage.getItem('userReview'));

    localStorage.setItem('userReview', JSON.stringify([...getFromLocalStorage,
      userReviewObj]));

    this.setState((prevState) => ({
      userReview: [...prevState.userReview, userReviewObj],
    }));
  }

  render() {
    const { product: { title, price }, pictures } = this.state;
    const { product, userReview } = this.state;
    const { productsCount } = this.state;
    return (
      <div>
        <span data-testid="shopping-cart-size">
          { productsCount }
        </span>
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
        <button
          type="button"
          onClick={ () => this.handleClickAddCart(product) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho

        </button>

        <form>
          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              id="email"
              placeholder="Digite
              seu e-mail"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="textArea">

            <textarea
              id="textArea"
              name="textArea"
              onChange={ this.handleChange }
              data-testid="product-detail-evaluation"
            />
          </label>

          <label htmlFor="avaliacao">
            <input
              type="radio"
              name="avaliacao"
              value={ 1 }
              onChange={ this.handleChange }
              data-testid="1-rating"
            />
            <input
              type="radio"
              name="avaliacao"
              value={ 2 }
              onChange={ this.handleChange }
              data-testid="2-rating"
            />
            <input
              type="radio"
              name="avaliacao"
              value={ 3 }
              onChange={ this.handleChange }
              data-testid="3-rating"
            />
            <input
              type="radio"
              name="avaliacao"
              value={ 4 }
              onChange={ this.handleChange }
              data-testid="4-rating"
            />
            <input
              type="radio"
              name="avaliacao"
              value={ 5 }
              onChange={ this.handleChange }
              data-testid="5-rating"
            />
          </label>

          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Avaliar

          </button>

        </form>

        {
          userReview.map((user, index) => (<ProductReviewCard
            user={ user }
            key={ index }
          />))
        }
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
