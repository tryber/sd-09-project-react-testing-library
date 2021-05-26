import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testing <Pokemon.js />', () => {
  it('Should render a Pokémon card with the correct informations', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const image = getByAltText('Pikachu sprite');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Should render a navigation link for Pokémon details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Should contain a star icon for favorite Pokémons', () => {
    const {
      getByText,
      getByLabelText,
      getByTestId,
      getByAltText,
    } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);
    const favorite = getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favorite);
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    const star = getByAltText(/Pikachu is marked as favorite/i);
    expect(star.src).toMatch('/star-icon.svg');
  });
});
