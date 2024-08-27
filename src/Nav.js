import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className='nav'>
        <h1>Logo</h1>
        <div className="nav-menu">
         <Link to="/"><h4>Movie</h4></Link> 
         <Link to="/adult"><h4>Adult</h4></Link>
         <Link to="/english"><h4>English Movie</h4></Link>
          
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className='nav-mobile'>
        <div className='moblie'>
          <h1>Logo</h1>
          <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {isOpen && (
          <div className="mobile-menu">
           <Link to="/"><h4>Movie</h4></Link> 
         <Link to="/adult"><h4>Adult</h4></Link>
         <Link to="/english"><h4>English Movie</h4></Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
