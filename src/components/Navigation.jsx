import { ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ shoppingOnClick, cartAmount, links }) => {
  const [shopIconColor, setShopIconColor] = useState('black');
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="h-16 mobile:pr-12 mobile:pl-12 pr-5 pl-5 pt-4 pb-4 font-sans flex">
      <ul className="flex gap-2 text-gray-700 font-medium">
        {links.map(({ id, to, name }) => (
          <li key={id}>
            <Link
              to={location.pathname.slice(1) !== to ? to : undefined}
              className="hover:text-green-400 transition ease-in-out duration-300"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex gap-2 items-center">
        <button
          aria-label="shopping card"
          onClick={shoppingOnClick}
          onMouseEnter={() => setShopIconColor('green')}
          onMouseLeave={() => setShopIconColor('black')}
        >
          <ShoppingBasket stroke={shopIconColor}></ShoppingBasket>
        </button>
        <p className="font-mono text-gray-600 text-[18px]">{cartAmount}</p>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  shoppingOnClick: PropTypes.func.isRequired,
  cartAmount: PropTypes.number,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Navigation.defaultProps = {
  cartAmount: 0,
  links: [],
};

export default Navigation;
