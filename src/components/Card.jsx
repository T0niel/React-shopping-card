import PropTypes from 'prop-types';

export default function Card({ name, imgUrl, price, category }) {
  return (
    <div>
      <img src={imgUrl} alt={category + ' ' + name}></img>
      <p>{name}</p>
      <p>{price}</p>
      <p>{category}</p>
    </div>
  );
}

Card.propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.number
}