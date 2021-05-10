import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test whether the message "No favorite pokemon found"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const no = getByText('No favorite pokemon found');
    expect(no).toBeInTheDocument();
  });

  test('Test whether all your favorite Pokémon cards are displayed.', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <App />
      </Router>,
    );
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(details);

    const favoritado = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoritado);

    const linkFavorite = screen.getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);

    const alt = screen.getByAltText(/is marked/i);
    expect(alt).toBeTruthy();
  });
});
