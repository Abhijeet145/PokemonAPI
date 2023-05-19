import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
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
    };

    fetchData();
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
      <Header />
      <input type="text" placeholder="Search Pokémon" value={searchTerm} onChange={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredPokemon.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      )}
      <div>
        {prevPageUrl && <button onClick={handlePrevPage}>Previous Page</button>}
        {nextPageUrl && <button onClick={handleNextPage}>Next Page</button>}
      </div>
      <Footer />
    </div>
  );
};

export default PokemonList;
