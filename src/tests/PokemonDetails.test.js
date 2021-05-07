import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import { pokemonMock, isFavoritePokemonMock } from './__mocks__/pokemonMock';

const isFavoritePokemonDetailsMock = Object.create(isFavoritePokemonMock);
function setupPokemonDetails(pokemon = { id: 25 }, props = {}) {
  const onUpdateMocked = jest.fn().mockImplementation((id, isFavorite) => {
    isFavoritePokemonDetailsMock[id] = isFavorite;
  });

  const utils = renderWithRouter(
    <PokemonDetails
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ isFavoritePokemonMock }
      onUpdateFavoritePokemons={ onUpdateMocked }
      match={ { params: { id: `${pokemon.id}` } } } // Route tested at Pokemon.test;
      { ...props }
    />,
  );

  return {
    ...utils,
    onUpdateMocked,
  };
}
pokemonMock.forEach((pokemon) => {
  const { name, summary } = pokemon;
  test(`if there are details about pokemon: ${name}`, () => {
    setupPokemonDetails(pokemon);
    expect(
      screen.getByRole('heading', { name: `${name} Details`, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.queryByText('More details')).toBeNull();
    expect(
      screen.getByRole('heading', { name: /summary/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.queryByText(summary)).toBeInTheDocument();
  });
});

pokemonMock.forEach((pokemon) => {
  const { name, foundAt } = pokemon;
  test(`if there is a map section with: ${name}'s location`, () => {
    const { container } = setupPokemonDetails(pokemon);
    expect(
      screen.getByRole('heading', {
        name: `Game Locations of ${name}`,
        level: 2,
      }),
    ).not.toBeNull();
    const { children: pokemonLocations } = container.querySelector(
      'div.pokemon-habitat',
    );
    expect(pokemonLocations.length).toBe(foundAt.length);
    foundAt.forEach(({ location, map }) => {
      const mapImg = screen.queryByRole('img', {
        name: (
          content,
          {
            nextSibling = null,
            parentElement: {
              parentElement: { className },
            },
          },
        ) => className === 'pokemon-habitat'
          && nextSibling.textContent === `${location}`,
      });
      expect(mapImg).toBeInTheDocument();
      expect(mapImg).toHaveAttribute('src', map);
      expect(mapImg).toHaveAttribute('alt', `${name} location`);
      const mapTitle = screen.queryByText(location);
      expect(mapTitle).toBeInTheDocument();
    });
  });
});

pokemonMock.forEach((pokemon) => {
  const { id, name } = pokemon;
  test(`${name} favorite checkbox starts ${isFavoritePokemonMock[id]} and action`, () => {
    const { onUpdateMocked } = setupPokemonDetails(pokemon);
    const checkboxFavorite = screen.getByRole('checkbox', {
      name: /favoritado/i,
    });
    expect(checkboxFavorite).toBeInTheDocument();
    if (isFavoritePokemonMock[id]) {
      expect(checkboxFavorite).toBeChecked();
    } else {
      expect(checkboxFavorite).not.toBeChecked();
    }
    userEvent.click(checkboxFavorite);
    expect(onUpdateMocked).toHaveBeenCalledTimes(1);
    expect(onUpdateMocked).toHaveBeenCalledWith(id, !isFavoritePokemonMock[id]);
    expect(checkboxFavorite.parentElement).toHaveTextContent(
      'Pokémon favoritado?',
    );
  });
});
