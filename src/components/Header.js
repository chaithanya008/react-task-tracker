import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAdd, showCloseBtn }) => {
  const location = useLocation();

  return (
    <header className='header'>
      <h1> {title} </h1>
      {location.pathname === '/' && (
        <Button colorForBtn={showCloseBtn ? 'red' : 'green'} btnText={showCloseBtn ? 'Close' : 'Add'} onClick={onAdd} />
      )}
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
