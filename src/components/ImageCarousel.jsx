import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ImageCarousel({ imgs }) {
  const [index, setIndex] = useState(0);

  if (imgs.length === 0) return <div>No images available</div>;

  return (
    <div>
      <img src={imgs[index].src} alt={imgs[index].alt}></img>
      <button
        onClick={() => {
          setIndex((index + 1) % imgs.length);
        }}
      >
        {'>'}
      </button>
      <button
        onClick={() => {
          setIndex((index - 1 + imgs.length) % imgs.length);
        }}
      >
        {'<'}
      </button>
    </div>
  );
}


ImageCarousel.propTypes = {
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
};
