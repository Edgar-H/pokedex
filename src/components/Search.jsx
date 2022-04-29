import axios from 'axios';
import { useEffect, useState } from 'react';

const url = `https://pokeapi.co/api/v2`;

export const Search = ({ setPokemons, setPokemonsFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonID, setPokemonID] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      const { data } = await axios.get(`${url}/pokemon/${pokemonID}`);

      if (data.id <= 649) {
        setPokemons([data]);
        setPokemonsFilters([]);
      }
    };

    if (pokemonID !== null) getPokemons();
  }, [pokemonID, setPokemons, setPokemonsFilters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonID(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className='search-form'>
      <p>Search for Pokémon by name or using the National Pokédex number.</p>
      <form onSubmit={handleSubmit}>
        <div className='search-input'>
          <input
            type='search'
            name='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
