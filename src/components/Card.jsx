import PropTypes from 'prop-types';

export default function Card({ name, imgUrl, price, category }) {
  return (
    <div className="p-2 min-w-64 h-80 rounded opacity-95 hover:opacity-100 transition ease-in-out delay-100 bg-gray-100 shadow-sm shadow-slate-200 cursor-pointer">
      <img
        className="w-[100%] mb-4 h-48 object-cover rounded"
        src={imgUrl}
        alt={category + ' ' + name}
      ></img>
      <p className="font-bold font-mono text-xl">{price}€</p>
      <p className="text-gray-700">{category}</p>
      <p className="font-medium">{name}</p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.number,
};
