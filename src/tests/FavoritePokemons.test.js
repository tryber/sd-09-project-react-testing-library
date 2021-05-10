import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test FavoritePokemons component', () => {
  it('tests the message for No favorite pokemon', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const message = queryByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('verifies if the favorite pokemons are showned', () => {
    const {
      queryByText, getByLabelText, getByAltText, getByRole, history,
    } = renderWithRouter(<App />);
    const detailButton = queryByText('More details');
    userEvent.click(detailButton);
    history.push('/pokemons/25');
    const favoriteInput = getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteInput);
    history.push('/favorites');
    const pokemonInfo = [
      getByRole('heading', {
        level: 2,
        name: /favorite pokémons/i,
      }),
      queryByText(/pikachu/i),
      queryByText(/electric/i),
      queryByText(/average weight/i),
      queryByText(/more details/i),
      getByAltText(/pikachu sprite/i),
      getByAltText(/is marked as favorite/i),
    ];
    expect(pokemonInfo[5].src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    pokemonInfo.forEach((element) => expect(element).toBeInTheDocument());
  });
});
