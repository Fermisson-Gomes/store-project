import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from './services/api';
import RadioCategory from './Components/RadioCategory';

class ProductList extends React.Component {
  state = {
    productList: [],
    inputValue: '',
    isEmpty: null,
    isDisabled: true,
    categoriesList: [],
    cartProducts: [],
    productsCount: 0,
  }

  componentDidMount() {
    if (localStorage.length === 0) localStorage.setItem('cart', '[]');
    this.listCategories();
    this.getNumberInCart();
  }

  handleClickAddCart = async (product) => {
    // const url = `https://api.mercadolibre.com/items/${id}`;
    // const resultFetch = await fetch(url);
    // const resultJSON = await resultFetch.json();
    this.setState(({ cartProducts }) => ({
      cartProducts: [...cartProducts, product],
    }), () => {
      const getFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
      if (getFromLocalStorage.some((item) => item.id === product.id)) {
        let count = Number(localStorage.getItem(product.id));
        localStorage.setItem(product.id, count += 1);
      } else {
        const novoArray = [...getFromLocalStorage, product];
        localStorage.setItem('cart', JSON.stringify(novoArray));
        localStorage.setItem(product.id, 1);
      }
      this.getNumberInCart();
    });
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

  listCategories = async () => {
    const resultFetchCategories = await getCategories();
    this.setState({
      categoriesList: [...resultFetchCategories],
    });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    if (value.length > 0) {
      this.setState({ inputValue: value, isDisabled: false });
    } else {
      this.setState({ inputValue: value, isDisabled: true });
    }
  }

  searchApi = async () => {
    const { inputValue } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, inputValue);
    if (response.results.length === 0) {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ productList: response.results, isEmpty: false });
    }
  }

  getCategoriesFromId = async (value) => {
    const response = await getProductsFromCategoryAndQuery(value, null);
    this.setState(
      { isEmpty: false,
        productList: response.results },
    );
  }

  render() {
    const {
      productList,
      productsCount,
      inputValue,
      isEmpty,
      isDisabled,
      categoriesList } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          value={ inputValue }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchApi }
          disabled={ isDisabled }
        >
          Buscar
        </button>
        <span data-testid="shopping-cart-size">
          { productsCount }
        </span>
        <Link
          to="/cart"
        >
          <button data-testid="shopping-cart-button" type="button">Carrinho</button>
        </Link>
        {isEmpty === null ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)
          : (
            <div>
              {
                isEmpty === true ? (<p>Nenhum produto foi encontrado</p>)
                  : productList.map((product) => (
                    <div data-testid="product" key={ product.id }>
                      <Link
                        data-testid="product-detail-link"
                        to={ `/product/${product.id}` }
                      >
                        <img src={ product.thumbnail } alt={ product.title } />
                        <p>{ product.title }</p>
                        <p>{ `R$${product.price}` }</p>
                      </Link>
                      <button
                        type="button"
                        onClick={ () => { this.handleClickAddCart(product); } }
                        data-testid="product-add-to-cart"
                      >
                        Adicionar ao Carrinho
                      </button>
                      {product.shipping.free_shipping
                      && <p data-testid="free-shipping">frete gratis</p>}
                    </div>
                  ))
              }

            </div>
          )}
        {categoriesList.map((category) => (<RadioCategory
          key={ category.id }
          categoryName={ category.name }
          categoryId={ category.id }
          getCategoriesFromId={ this.getCategoriesFromId }
        />))}
      </div>
    );
  }
}

export default ProductList;
