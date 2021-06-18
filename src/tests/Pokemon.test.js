import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Pokémon component', () => {
  it('verify if are render the name, type and average weigth', () => {
    const { getByTestId, getByText, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByText('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    const pokemonAverage = getByText('Average weight: 6.0 kg');
    const pokemonAltImage = getByAltText('Pikachu sprite');
    const imagePath = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonAverage).toBeInTheDocument();
    expect(pokemonAltImage.src).toBe(imagePath);
  });

  it('verify if link details have a link with the id of pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkDetails = getByText('More details');

    userEvent.click(linkDetails);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('verify if star icon is correctly render', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const linkDetails = getByText('More details');
    userEvent.click(linkDetails);

    const linkFavorite = getByText('Pokémon favoritado?');
    userEvent.click(linkFavorite);

    const favoriteIconPikachu = getByAltText('Pikachu is marked as favorite');

    expect(favoriteIconPikachu.src).toBe('http://localhost/star-icon.svg');
  });
});
