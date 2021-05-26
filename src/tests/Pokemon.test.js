import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Test for the Pokemon component', () => {
  it('should render a pokemon card with the corrent information', () => {
    const { getByText, getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);

    const nextPokemonButton = getByText(/Próximo pokémon/i);
    expect(nextPokemonButton).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);

    expect(getByTestId(/pokemon-name/)).toHaveTextContent(/Charmander/);
    expect(getByTestId(/pokemonType/)).toHaveTextContent(/Fire/);
    expect(getByTestId(/pokemon-weight/)).toHaveTextContent('Average weight: 8.5 kg');

    const pokemonImage = getByAltText('Charmander sprite');
    const url = 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png';

    expect(pokemonImage.src).toBe(url);
    expect(getByRole('img').src).toBe(url);
  });

  it('should have a link to "More Details"', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should show a star icon when the pokemon is favorited', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);

    const favoriteCheckButton = getByLabelText(/Pokémon favoritado?/);
    expect(favoriteCheckButton).toBeInTheDocument();

    fireEvent.click(favoriteCheckButton);

    const favoriteIcon = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
