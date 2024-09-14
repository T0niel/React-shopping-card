import PropTypes from 'prop-types'

export default function CustomButton({onClick, text}){
    return (
      <button
        className="block w-[100%] border-2 opacity-90 hover:opacity-100 border-gray-400 rounded-lg p-2"
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