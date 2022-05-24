import React from 'react';
import { getProductsFromCategoryAndQuery } from './services/api';

class ProductList extends React.Component {
  state = {
    productList: [],
    inputValue: '',
    isEmpty: null,
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    (value.length > 0) ? this.setState({ inputValue: value, isDisabled: false })
    : this.setState({ inputValue: value, isDisabled: true })
  }

  searchApi = async () => {
    const { inputValue } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, inputValue);
    (response.results.length === 0) ? this.setState({ isEmpty: true })
    : this.setState({ productList: response.results, isEmpty: false });
  }

  render() {
    const { productList, inputValue, isEmpty, isDisabled } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text" value={ inputValue }
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
        {isEmpty === null ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)
          : (
            <div>
              {
                isEmpty === true ? (<p>Nenhum produto foi encontrado</p>)
                : productList.map(({title, thumbnail, price, id}) => (
                  <div data-testid="product" key={ id } >
                    <img src={ thumbnail } alt={ title } />
                    <p>{ title }</p>
                    <p>{ `R$${price}` }</p>
                    <button>Adicionar ao Carrinho</button>
                  </div>
                ))
              }
            </div>
          )
          }
      </div>
    );
  }
}

export default ProductList;
