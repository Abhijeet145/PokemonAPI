import React ,{useState,useEffect} from 'react';

const PokemonCard = ({ name, url }) => {
    
    const[abilities , setAbilities] = useState([]);
    name = name.charAt(0).toUpperCase() + name.slice(1);

    useEffect(() => {
    (async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setAbilities(data.abilities);
        } catch (error) {
          console.log(error);
        }
      })();
    },[abilities,url]);

  return (
    <div className="pokemon-card">
      <h3>{name}</h3>
      <h5>Abilities:</h5>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.slot}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonCard;
