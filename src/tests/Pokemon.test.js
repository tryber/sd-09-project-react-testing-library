import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test <Pokemon /> component', () => {
  it('should render Pokemon card info', () => {
    const { getByText, getByAltText, getByTestId } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const pokemonType = (getByTestId('pokemon-type'));
    expect(pokemonType.textContent).toBe('Electric');
    const image = getByAltText('Pikachu sprite');
    const imagePath = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(image.src).toBe(imagePath);
  });

  it('should have a nav link to Pokemon Details, with proper URL', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', { name: 'More details' });
    expect(detailsButton).toBeDefined();
    userEvent.click(detailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('should add a star on favorite pokemons', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', { name: 'More details' });
    userEvent.click(detailsButton);
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteLabel);
    const starImage = getByAltText('Pikachu is marked as favorite');
    console.log(starImage.src);
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
    expect(starImage).toBeInTheDocument();
  });
});
