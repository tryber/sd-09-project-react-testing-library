import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('test <Pokemon />', () => {
  let randomIndex;
  let randomPokemon;

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * pokemons.length);
    randomPokemon = pokemons[randomIndex];
  });

  it('render a card containing pokemon info', () => {
    const {
      name,
      type,
      averageWeight: { value, measurementUnit },
      image: imageSrc,
    } = pokemons[randomIndex];
    const weight = `Average weight: ${value} ${measurementUnit}`;
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ randomPokemon }
      isFavorite={ false }
    />);

    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(getByTestId('pokemonType')).toHaveTextContent(type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(weight);
    const img = getByRole('img', {
      name: new RegExp(`${name} sprite`, 'i'),
    });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imageSrc);
  });

  it('contains a link to page of details', async () => {
    const { id } = pokemons[randomIndex];
    const path = `/pokemons/${id}`;
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ randomPokemon }
      isFavorite={ false }
    />);

    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link.pathname).toBe(path);

    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe(path);
  });

  it('renders a star icon if pokemon is a favorite', () => {
    const { name } = pokemons[randomIndex];
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ randomPokemon }
      isFavorite
    />);

    const star = getByRole('img', {
      name: new RegExp(`${name} is marked as favorite`),
    });
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
