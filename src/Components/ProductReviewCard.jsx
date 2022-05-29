import React from 'react';

export default class ProductReviewCard extends React.Component {
  render() {
    const { user: { email, textArea, avaliacao } } = this.props;
    return (
      <div>
        <span>{email}</span>
        <span>{textArea}</span>
        <label htmlFor="avaliacao">
          <input
            type="radio"
            name="avaliacao1"
            value={ 1 }
            checked={ avaliacao === '1' }
            data-testid="1-rating"
          />
          <input
            type="radio"
            name="avaliacao2"
            value={ 2 }
            checked={ avaliacao === '2' }
            data-testid="2-rating"
          />
          <input
            type="radio"
            name="avaliacao3"
            value={ 3 }
            checked={ avaliacao === '3' }
            data-testid="3-rating"
          />
          <input
            type="radio"
            name="avaliacao4"
            value={ 4 }
            checked={ avaliacao === '4' }
            data-testid="4-rating"
          />
          <input
            type="radio"
            name="avaliacao5"
            value={ 5 }
            checked={ avaliacao === '5' }
            data-testid="5-rating"
          />
        </label>

      </div>
    );
  }
}
