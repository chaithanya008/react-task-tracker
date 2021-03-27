import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showCloseBtn }) => {
  return (
    <header className='header'>
      <h1> {title} </h1>
      <Button colorForBtn={showCloseBtn ? 'red' : 'green'} btnText={showCloseBtn ? 'Close' : 'Add'} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string,
};

// CSS in JS
// const headerStyle = {
//   color: 'red',
// };
export default Header;
