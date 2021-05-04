import userEvent from '@testing-library/user-event';
import React from 'react';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

const pokemonMock = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('Requirement 6: Component Pokemon', () => {
  it('Tests pokemon card render', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite={ false }
    />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByRole('img').alt).toBe('Pikachu sprite');
  });
  it('Tests navigation link in pokemon card render', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite={ false }
    />);
    expect(getByRole('link').innerHTML).toBe('More details');
    expect(getByRole('link').href).toContain('pokemons/25');
  });
  it('Tests link redirection in pokemon card', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });
  it('Tests if the url is changed by clicking on the link', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite={ false }
    />);
    userEvent.click(getByRole('link'));
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Tests favorite icon render', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const imgs = getAllByRole('img');
    imgs.forEach((img) => {
      if (img.className === 'favorite-icon') {
        expect(img.src).toContain('/star-icon.svg');
        expect(img.alt).toBe('Pikachu is marked as favorite');
      }
    });
  });
});
