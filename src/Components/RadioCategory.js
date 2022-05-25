import React from 'react';
import PropTypes from 'prop-types';

export default class RadioCategory extends React.Component {
  render() {
    const { categoryName, categoryId, getCategoriesFromId } = this.props;
    console.log(categoryName);
    return (
      <label htmlFor="category">
        <input
          type="radio"
          value={ categoryId }
          name="category"
          data-testid="category"
          onClick={ (event) => getCategoriesFromId(event.target.value) }
        />
        {categoryName}
      </label>
    );
  }
}

RadioCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  getCategoriesFromId: PropTypes.func.isRequired,
};
