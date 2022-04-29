import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Error404 } from './Error404';
import { typeColors, colors } from '../helpers/Colors';
import { Auth } from '../providers/AuthContext';
import axios from 'axios';

const url = `https://pokeapi.co/api/v2`;

export const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState(null),
    [species, setSpecies] = useState(null),
    [locations, setLocations] = useState(null),
    { user } = useContext(Auth),
    params = useParams(),
    id = parseInt(params.id);

  useEffect(() => {
    const getPokemons = async () => {
      const { data } = await axios.get(`${url}/pokemon/${id}`);

      if (id !== isNaN && id <= 649) {
        const id = data.id,
          name = data.name,
          poke_types = data.types.map((type) => type.type.name),
          abilities = data.abilities.map((ability) => ability.ability.name),
          type = typeColors.find((type) => poke_types.indexOf(type) > -1),
          color = colors[type],
          weight = (data.weight / 10).toFixed(1),
          height = (data.height / 10).toFixed(1),
          types = poke_types.map((type) => type).join(' / '),
          ability = abilities.map((ability) => ability).join(', '),
          icon = `../img/icons/${type}.svg`,
          image = `../img/images/${data.id}.svg`,
          stats = data.stats.map((stat) => {
            const stats = {
              stat_base: stat.base_stat,
              name: stat.stat.name,
            };

            return stats;
          });

        setPokemon({
          id,
          name,
          type,
          ability,
          color,
          weight,
          height,
          types,
          icon,
          image,
          stats,
        });
      }
    };

    getPokemons();
  }, [id]);

  useEffect(() => {
    const getPokemonsEntries = async () => {
      const { data } = await axios.get(`${url}/pokemon-species/${id}`);
      setSpecies(data);
    };

    if (id !== isNaN && id <= 649) getPokemonsEntries();
  }, [id]);

  useEffect(() => {
    const getPokemonsEncounters = async () => {
      const { data } = await axios.get(`${url}/pokemon/${id}/encounters`),
        getLocations = data.map((encounters) => {
          const area = encounters.location_area.name.split('-'),
            region = area.splice(0, 1),
            location = { region, area };

          return location;
        });

      setLocations(getLocations);
    };

    if (id !== isNaN && id <= 649) getPokemonsEncounters();
  }, [id]);

  return (
    <>
      {user ? (
        <>
          {id !== isNaN && id <= 649 ? (
            <>
              {pokemon && species && locations ? (
                <div className='poke-detail'>
                  <div
                    className='hero'
                    style={{ backgroundColor: `${pokemon.color}` }}
                  >
                    <Link to='/pokedex'>
                      <i className='fas fa-chevron-left'>Back</i>
                    </Link>
                    <div className='img-content'>
                      <img src='./img/pokebola.svg' alt='' />
                      <img src={pokemon.image} alt={pokemon.name} />
                    </div>
                    <div className='name'>
                      <p>{pokemon.name}</p>
                      <div>
                        <img src={pokemon.icon} alt='xd' />#{' '}
                        {pokemon.id.toString().padStart(3, '0')}
                      </div>
                    </div>
                  </div>

                  <div className='body-description'>
                    <div className='container-details container'>
                      <p>
                        {species.flavor_text_entries[1].flavor_text.replace(
                          '\f',
                          '\n'
                        )}
                      </p>

                      <table className='col-s-12 col-md-6'>
                        <thead>
                          <tr>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Species:</td>
                            <td>{species.genera[7].genus}</td>
                          </tr>
                          <tr>
                            <td>Height:</td>
                            <td>{pokemon.height} m</td>
                          </tr>
                          <tr>
                            <td>Width:</td>
                            <td>{pokemon.weight} kg</td>
                          </tr>
                          <tr>
                            <td>Abilities:</td>
                            <td>{pokemon.ability.split('-').join(' ')}</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className='col-s-12 col-md-5'>
                        <thead>
                          <tr>
                            <th>Stat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pokemon?.stats.map((stat) => {
                            return (
                              <tr key={stat.name}>
                                <td className='table-title'>
                                  {stat.name.replace('-', '\n')}:
                                </td>
                                <td className='table-description'>
                                  {stat.stat_base}
                                </td>
                                <td className='table-progress'>
                                  <div className='progress'>
                                    <div
                                      className='bar'
                                      style={{
                                        width: `${stat.stat_base}%`,
                                        background: pokemon.color,
                                      }}
                                    >
                                      <p className='percent'>
                                        {stat.stat_base}%
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <table className='col-s-12 col-md-12'>
                        <thead>
                          <tr>
                            <th>Encounters</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locations.length !== 0 ? (
                            <>
                              <p>
                                <span>Region: </span>
                                {locations.map((location, index) => {
                                  return (
                                    <span key={index + 1}>
                                      {'"' + location.region + '." '}
                                    </span>
                                  );
                                })}
                              </p>
                              <p>
                                <span>Area: </span>
                                {locations.map((location, index) => {
                                  return (
                                    <span key={index + 1}>
                                      {'"' + location.area.join(' ') + '." '}
                                    </span>
                                  );
                                })}
                              </p>
                            </>
                          ) : (
                            <tr>
                              <td className='table-description'>
                                There is no information about its location.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='bg-loading'>
                  <div className='loading'>
                    <div className='pokeball'></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Error404 linkTo={'/pokedex'} />
          )}
        </>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};
