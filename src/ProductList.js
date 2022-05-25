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
  }

  componentDidMount() {
    if (localStorage.length === 0) localStorage.setItem('cart', '[]');
    this.listCategories();
  }

  handleClickAddCart = async (product) => {
    // const url = `https://api.mercadolibre.com/items/${id}`;
    // const resultFetch = await fetch(url);
    // const resultJSON = await resultFetch.json();
    this.setState(({ cartProducts }) => ({
      cartProducts: [...cartProducts, product],
    }));
    const { cartProducts } = this.state;
    if (localStorage.getItem('cart').includes(product.id)) {
      let count = Number(localStorage.getItem(product.id));
      localStorage.setItem(product.id, count += 1);
    } else {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      localStorage.setItem(id, 1);
    }
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
                      <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
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
