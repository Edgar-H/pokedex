import { Link } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';

const url = `https://pokeapi.co/api/v2`;

export const PokemonList = ({
  pokemons,
  pokemonsFilters,
  page,
  pokemonsPerPage,
}) => {
  return (
    <div className='pokeList'>
      {pokemons?.map((pokemon) => {
        return (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className='col-s-12 col-md-5 col-lg-3'
          >
            <PokemonCard url={`${url}/pokemon/${pokemon.id}`} />
          </Link>
        );
      })}

      {pokemonsFilters
        ?.slice(page * pokemonsPerPage, pokemonsPerPage * (page + 1))
        .map((filter) => {
          return (
            <Link
              key={filter.pokemon.url.split('/')[6]}
              to={`/pokemon/${filter.pokemon.url.split('/')[6]}`}
              className='col-s-12 col-md-5 col-lg-3'
            >
              <PokemonCard url={filter.pokemon.url} />
            </Link>
          );
        })}
    </div>
  );
};
