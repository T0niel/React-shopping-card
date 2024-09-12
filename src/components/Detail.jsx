import { ChevronDown, ChevronUp} from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Detail({ text = '', children, maxHeightPixels = 200 }) {
  const [display, setDisplay] = useState(false);

  return (
    <div
      className=" bg-gray-200 cursor-pointer rounded"
      onClick={() => {
        setDisplay(!display);
      }}
    >
      <div className="flex items-center border-b-1 border-gray-300">
        <h1 className="p-2 mr-auto">{text}</h1>
        {display ? (
          <ChevronUp stroke="gray"></ChevronUp>
        ) : (
          <ChevronDown stroke="gray"></ChevronDown>
        )}
      </div>
      {display && (
        <div
          className="bg-gray-100 border-2 p-2 overflow-y-auto"
          style={{ maxHeight: `${maxHeightPixels}px` }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

Detail.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element,
  maxHeightPixels: PropTypes.number
};
