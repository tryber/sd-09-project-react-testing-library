import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Component Pokemon', () => {
  const favoritePokemonIds = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  it('should contains a Pokemon Card', () => {
    const { history,
      getByTestId,
      getByAltText,
      getByRole,
      getByLabelText,
    } = renderWithRouter(
      <App
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonIds }
      />,
    );

    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');

    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const weigth = getByTestId('pokemon-weight');
    expect(weigth).toHaveTextContent('Average weight: 6.0 kg');

    const image = getByAltText('Pikachu sprite');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const details = getByRole('link', { name: 'More details' });
    expect(details.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(details);
    console.log(details);
    expect(history.location.pathname).toBe('/pokemons/25');

    const favorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);

    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
