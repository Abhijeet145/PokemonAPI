import React, { useState, useEffect} from 'react';

const Pagination = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(currentPageUrl);
        const data = await response.json();
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setPokemonData(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

  }, [currentPageUrl]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const handlePrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container-fluid'>
      <input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredPokemon.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      )}
      
      <div className='buttonContainer'>
        {prevPageUrl && <button className='previousPageButton btn btn-dark' onClick={handlePrevPage}>Previous Page</button>}
        {nextPageUrl && <button className='nextPageButton btn btn-dark' onClick={handleNextPage}>Next Page</button>}
      </div>
        
    </div>
  );
};

export default Pagination;

