import React, { useState} from 'react';
import Header from  './Header';
import Footer from './Footer';
import Pagination from './Pagination';
import LazyLoad from './LazyLoad';

const PokemonList = () => {
  const [isLazyLoad, setLazyLoad] = useState(false);

  function handleToggle(){
    setLazyLoad(!isLazyLoad);
  }

  return (
    <div className='container-fluid'>
      <Header />
      <div className={`toggle-container ${isLazyLoad ? 'toggled' : ''}`} onClick={handleToggle}>
      <div className="toggle-track">
        <div className="toggle-thumb"></div>
      </div>
    </div>
      {
        isLazyLoad?(<LazyLoad/>):(<Pagination />)
      }
      <Footer />
    </div>
  );
};

export default PokemonList;

