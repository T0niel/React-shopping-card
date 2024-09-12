import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Detail({ text = '', children }) {
  const [display, setDisplay] = useState(false);

  return (
    <div onClick={() => {
        setDisplay(!display);
    }}>
      <h1>{text}</h1>
      {display && <div>{children}</div>}
    </div>
  );
}

Detail.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element
};
