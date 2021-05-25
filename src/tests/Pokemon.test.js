import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Testing Pokemon component', () => {
  it('Verifies info of especific pokemon card',
    () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemonType');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImg = screen.getByAltText('Pikachu sprite');

      expect(pokemonName).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
      expect(pokemonImg.src).toBe(
        'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      );
    });

  it('verifies link',
    () => {
      renderWithRouter(<App />);
      const link = screen.getByText(moreDetails);
      expect(link).toBeInTheDocument();
    });

  it('verifies router to details page', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(moreDetails);
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('verifies star icon', () => {
    renderWithRouter(<App />);

    const detailsPokemon = screen.getByText(moreDetails);
    expect(detailsPokemon).toBeInTheDocument();

    userEvent.click(detailsPokemon);
    const labelForm = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(labelForm);

    const imgFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorito).toBeInTheDocument();
    expect(imgFavorito.src).toBe('http://localhost/star-icon.svg');
  });
});
