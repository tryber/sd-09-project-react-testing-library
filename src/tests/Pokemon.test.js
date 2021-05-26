import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';
const POKEMON_TYPE = 'pokemonType';
const POKEMON_WEIGHT = 'pokemon-weight';

describe('test Pokemon component', () => {
  it('test if a pokemon card is rendered', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const name = screen.getByTestId(POKEMON_NAME);
    expect(name).toHaveTextContent('Pikachu');

    const type = screen.getByTestId(POKEMON_TYPE);
    expect(type).toHaveTextContent('Electric');

    const weight = screen.getByTestId(POKEMON_WEIGHT);
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', pokemons[0].image);
  });

  it('test if pokemon card has a show details link', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it('test if details page is rendered after clicking on link', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('test if there is a star icon on favorited pokemon details page', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
