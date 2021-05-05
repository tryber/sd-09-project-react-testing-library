import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';
import { Pokemon } from '../components';

describe('Component <Pokemon.js /> Test', () => {
  test('renders a pokémon card with info', () => {
    const pokemons = data.map((pokemon) => pokemon.image);
    const { getByTestId, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const image = getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', pokemons[0]);
  });

  test('pokémon card contains a link to pokémon details', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText('More details');
    expect(link).toBeInTheDocument();
  });

  test('navigation to pokemon detail + URL contains pokémon id', () => {
    const { history, getByText } = RenderWithRouter(
      <Pokemon pokemon={ data[0] } />,
    );
    const link = getByText('More details');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('star icon on favorite pokémons', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite />,
    );
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
