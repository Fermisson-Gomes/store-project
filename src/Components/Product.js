import React from 'react';
import { PropTypes } from 'prop-types';

export default class Product extends React.Component {
  state = {
    product: {},
    pictures: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    await this.getProductById(id);
  }

  getProductById = async (id) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const resultFetch = await fetch(url);
    const resultJSON = await resultFetch.json();
    console.log(resultJSON.pictures);
    this.setState({ product: resultJSON, pictures: resultJSON.pictures });
  }

  render() {
    const { product: { title, price }, pictures } = this.state;
    // obj.map(({ url }) => console.log(url));
    return (
      <div>
        <h3 data-testid="product-detail-name">{ title }</h3>
        {
          pictures.map(({ url, id }) => (
            <img src={ url } alt={ id } key={ id } />
          ))
        }
        <p>{ price }</p>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape.isRequired,
};
