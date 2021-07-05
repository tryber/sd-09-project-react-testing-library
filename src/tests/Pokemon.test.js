import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('tests the component Pokemon', () => {
  it('must render a card about each pokémon info', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );

    const pokemonName = getByText(/Pikachu/i);
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeigth = getByText(/Average weight: 6.0 kg/i);

    const pokemonImg = getByAltText('Pikachu sprite');
    const favIcon = getByAltText('Pikachu is marked as favorite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeigth).toBeInTheDocument();

    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(favIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });

  it('must have a link to pokemon details page', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    const moreDetails = getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetails);

    const heading = getByRole('heading', { level: 2, name: /Details/ });
    expect(heading).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
});
