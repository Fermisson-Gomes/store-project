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
  }

  componentDidMount() {
    this.listCategories();
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

  render() {
    const { productList, inputValue, isEmpty, isDisabled, categoriesList } = this.state;
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
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho</button>
        </Link>
        {isEmpty === null ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)
          : (
            <div>
              {
                isEmpty === true ? (<p>Nenhum produto foi encontrado</p>)
                  : productList.map(({ title, thumbnail, price, id }) => (
                    <div data-testid="product" key={ id }>
                      <img src={ thumbnail } alt={ title } />
                      <p>{ title }</p>
                      <p>{ `R$${price}` }</p>
                      <button type="button">Adicionar ao Carrinho</button>
                    </div>
                  ))
              }

            </div>
          )}
        {categoriesList.map((category) => (<RadioCategory
          key={ category.id }
          categoryName={ category.name }
        />))}
      </div>
    );
  }
}

export default ProductList;
