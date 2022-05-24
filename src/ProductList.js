import React from 'react';
import RadioCategory from './Components/RadioCategory';
import { getCategories } from './services/api';

class ProductList extends React.Component {
  state = {
    productList: [],
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

  render() {
    const { productList, categoriesList } = this.state;
    return (
      <div>
        <input type="text" />
        {productList.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}

        {categoriesList.map((category) => (<RadioCategory
          key={ category.id }
          categoryName={ category.name }
        />))}
      </div>
    );
  }
}

export default ProductList;
