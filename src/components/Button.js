import PropTypes from 'prop-types';

const Button = ({ colorForBtn, btnText, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colorForBtn }}
      className='btn'
    >
      {btnText}
    </button>
  );
};

Button.defaultProps = {
  colorForBtn: 'steelblue',
};

Button.prototype = {
  btnText: PropTypes.string,
  colorForBtn: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
