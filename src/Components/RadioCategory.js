import React from 'react';
import PropTypes from 'prop-types';

export default class RadioCategory extends React.Component {
  render() {
    const { categoryName } = this.props;
    console.log(categoryName);
    return (
      <label htmlFor="category">
        <input
          type="radio"
          value={ categoryName }
          name={ categoryName }
          data-testid="category"
        />
        {categoryName}
      </label>
    );
  }
}

RadioCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
