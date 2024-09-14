import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CustomInput({onChange, placeholder, type}){
    const [value, setValue] = useState('');
    return (
        <input
          className="p-1 bg-transparent border-b-2 w-[100%] outline-none focus:border-gray-300"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val);
            onChange(val);
          }}
        ></input>
    );
}

CustomInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}