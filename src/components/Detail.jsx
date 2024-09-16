import { ChevronDown, ChevronUp} from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Detail({ text = '', children, maxHeightPixels = 200 }) {
  const [display, setDisplay] = useState(false);

  return (
    <div
      className=" bg-gray-200 border-2 rounded text-gray-700"
      onClick={() => {
        setDisplay(!display);
      }}
    >
      <div className="flex items-center cursor-pointer   ">
        <h1 className="p-2 mr-auto select-none ">{text}</h1>
        {display ? (
          <ChevronUp stroke="gray" className="mr-2"></ChevronUp>
        ) : (
          <ChevronDown stroke="gray" className="mr-2"></ChevronDown>
        )}
      </div>
      {display && (
        <div
          className="bg-gray-100  overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
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
