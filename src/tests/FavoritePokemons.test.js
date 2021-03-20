import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing favorites component', () => {
  it('should appear "no pokemons found if not have favorites"', () => {
    const { getByText } = render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('should shows the favorited pokémons', () => {
    const { getByText, getByAltText, getByRole, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    userEvent.click(home);
    history.push('/');
    const firstPage = getByText(/encountered pokémons/i);
    expect(firstPage).toBeInTheDocument();
    userEvent.click(getByText(/more details/i));
    history.push('/pokemons/25');
    const details = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(details).toBeInTheDocument();
    userEvent.click(getByText(/favoritado/i));
    const favorited = getByAltText(/favorite/i);
    expect(favorited).toBeInTheDocument();
    userEvent.click(getByText(/favorite Pokémons/i));
    history.push('/favorites');
    const favoritePokemon = getByText(/pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
