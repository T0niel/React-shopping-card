import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ImageCarousel({ imgs }) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    imgs.forEach((img) => {
      const image = new Image();
      image.src = img.src; // Image starts loading and gets cached
      img.decoding = 'async';
    });
  }, [imgs]);

  useEffect(() => {
    setLoading(true);
  }, [index]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handlePrevClick = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imgs.length) % imgs.length);
  };

  const handleNextClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imgs.length);
  };

  if (imgs.length === 0) return <div>No images available</div>;

  return (
    <div className="w-[100%] h-[100%] relative border-2 rounded border-gray-200">
      {loading && (
        <div className="loader absolute top-0 left-0 right-0 bottom-0 -z-10 flex justify-center items-center m-[auto]"></div>
      )}

      {index < imgs.length && (
        <img
          src={imgs[index].src}
          alt={imgs[index].alt}
          className={`object-contain w-[100%] h-[100%] ${
            loading ? 'opacity-50' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
        />
      )}
      {imgs.length > 1 && (
        <>
          <button
            className="absolute top-0 h-[100%] w-8 font-bold text-xl"
            onClick={handlePrevClick}
          >
            <div className="w-[100%] h-[100%] bg-gray-400 rounded hover:opacity-40 transition-opacity ease-in delay-100 opacity-20 absolute top-0"></div>
            {'<'}
          </button>
          <button
            className="absolute top-0 right-0 h-[100%] w-8 font-bold text-xl"
            onClick={handleNextClick}
          >
            <div className="w-[100%] h-[100%] bg-gray-400 rounded hover:opacity-40 transition-opacity ease-in delay-100 opacity-20 absolute top-0"></div>
            {'>'}
          </button>
        </>
      )}
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
