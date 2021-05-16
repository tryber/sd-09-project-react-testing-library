// test('', () => {});
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Test <FavoritePokemons /> component', () => {
  it('should display "No favorite pokemon found" if no favorites', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('should render all favorited pokemons', () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
      getAllByTestId,
    } = renderWithRouter(<App />);
    const electric = getByRole('button', { name: 'Electric' });
    userEvent.click(electric);
    let moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    let favoriteLabel = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteLabel);
    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const bug = getByRole('button', { name: 'Bug' });
    userEvent.click(bug);
    moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    expect(getByText('Caterpie')).toBeInTheDocument();
    favoriteLabel = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteLabel);
    const favoritesLink = getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesLink);
    const favorites = getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(2);
  });
});
