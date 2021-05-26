import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testing <Pokemon />', () => {
  it('should properly render the Pokemon card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonImage = getByAltText(/Pikachu sprite/i);
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should have a navigation link with the path "/pokemons/<id>"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    fireEvent.click(moreDetailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should have a star icon at favorited Pokemons', () => {
    const {
      getByText,
      getByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    fireEvent.click(moreDetailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    const pokemonFav = getByLabelText('Pokémon favoritado?');
    fireEvent.click(pokemonFav);
    expect(pokemonFav).toBeChecked();
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const pokemonPicture = getByAltText(/Pikachu is marked as favorite/);
    expect(pokemonPicture).toBeInTheDocument();
    expect(pokemonPicture.src).toMatch(/star-icon.svg/i);
  });
});
