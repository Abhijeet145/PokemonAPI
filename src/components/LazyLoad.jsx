import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
const LazyLoad = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const observer = useRef();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(currentPageUrl);
        const data = await response.json();
        setNextPageUrl(data.next);
        setPokemonData((prevData) => [...prevData, ...data.results]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

  }, [currentPageUrl]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && nextPageUrl) {
        setCurrentPageUrl(nextPageUrl);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current && isLoading === false) {
      observer.current.observe(document.querySelector('.observer-element'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [nextPageUrl, isLoading]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <input type="text" placeholder="Search Pokémon" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredPokemon.map((pokemon, index) => (
            <li key={index}><PokemonCard name={pokemon.name} url={pokemon.url} /></li>
        ))}
      </ul>
      
      <div className="button-container">
        <div className="observer-element" style={{ height: '10px' }} />
      </div>
    </div>
  );
};

export default LazyLoad;
