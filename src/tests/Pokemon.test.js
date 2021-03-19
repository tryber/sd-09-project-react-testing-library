import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 6: Test the component <Pokemon.js />', () => {
  test('Tests if a determined Pokémon card is rendered', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    const pokeName = getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();

    const pokeType = getByTestId('pokemonType');
    expect(pokeType.textContent).toBe('Electric');

    const pokeAverageWeight = getByText('Average weight: 6.0 kg');
    expect(pokeAverageWeight).toBeInTheDocument();

    const pokeImg = getByRole('img');
    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });

  test('Tests if there is a link "More details" and tests it', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  test('Tests the link "More details" when the user click on it', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Tests if favorited Pokémons have a star icon', () => {
    const { getByText, getByLabelText, getAllByRole } = renderWithRouter(<App />);

    const moreDetLink = getByText(/more details/i);
    userEvent.click(moreDetLink);

    const favPoke = getByLabelText(/favoritado/i);
    userEvent.click(favPoke);

    const image = getAllByRole('img')[1];
    expect(image.src).toBe('http://localhost/star-icon.svg');
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
