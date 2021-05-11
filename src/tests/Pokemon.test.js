import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const dummyPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries'
  + 'with electricity to make them tender enough to eat.',
};

const POKEMON_NAME_ID = 'pokemon-name';
const POKEMON_TYPE_ID = 'pokemonType';
const POKEMON_WEIGHT_ID = 'pokemon-weight';
const DETAILS_LINK_TEXT = 'More details';

afterEach(cleanup);

describe('Pokemon.js tests', () => {
  it('should render card with pokemon\'s info', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const { name, type, averageWeight: { value, measurementUnit }, image } = dummyPokemon;
    expect(screen.getByTestId(POKEMON_NAME_ID).innerHTML).toBe(name);
    expect(screen.getByTestId(POKEMON_TYPE_ID).innerHTML).toBe(type);
    expect(screen.getByTestId(POKEMON_WEIGHT_ID).innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', image);
  });
  it('should have a link to its details', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const { id } = dummyPokemon;
    const detailsLink = screen.queryByText(DETAILS_LINK_TEXT);
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('should render details page when details link is clicked', () => {
    renderWithRouter(<App />);
    const { name } = dummyPokemon;
    const detailsLink = screen.queryByText(DETAILS_LINK_TEXT);
    userEvent.click(detailsLink);
    const detailsHeading = screen.getByRole(
      'heading',
      {
        level: 2,
        name: `${name} Details`,
      },
    );
    expect(detailsHeading).toBeInTheDocument();
  });
  it('should route to /pokemons/<id> path when details link is clicked', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const { id } = dummyPokemon;
    const detailsLink = screen.queryByText(DETAILS_LINK_TEXT);
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('should display a star icon when is favorite', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ dummyPokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const { name } = dummyPokemon;
    const favoriteImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
