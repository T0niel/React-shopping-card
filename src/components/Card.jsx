import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Card({ name, imgUrl, price, category, productId }) {
  const navigate = useNavigate();
  return (
    <div className="p-2 rounded opacity-95 hover:opacity-100 transition ease-in-out delay-100 bg-gray-50 shadow-sm shadow-slate-200 cursor-pointer animate-pop" onClick={(() => {
      console.log('onClick');
      navigate(`/product/${productId}`, { replace: true });
    })}>
      <img
        className="w-[100%] mb-4 h-48 object-cover rounded animate-pop"
        src={imgUrl}
        alt={category + ' ' + name}
      ></img>
      <div className='flex'>
        <p className="font-bold font-mono text-xl">{price}</p>€
      </div>
      <p className="text-gray-700">{category}</p>
      <p className="font-medium">{name}</p>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  productId: PropTypes.number,
};
