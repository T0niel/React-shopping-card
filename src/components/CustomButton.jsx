import PropTypes from 'prop-types'

export default function CustomButton({onClick, text}){
    return (
      <button
        className="block w-[100%] border-2 text-black opacity-80 hover:opacity-100 border-gray-600 rounded-lg p-2"
        onClick={onClick}
      >
        {text}
      </button>
    );
}

CustomButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string
}