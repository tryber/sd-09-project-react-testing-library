import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 6 - Testing component <Pokemon />', () => {
  test('tests if the pokemon name is shown', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemonType').textContent).toBe('Electric');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    const pokeImg = document.querySelector('img');
    expect(pokeImg.alt).toBe('Pikachu sprite');
    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('tests if card has a link to "more details" with correct URL', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getAllByRole('link');
    // console.log(moreDetailsLink[3].textContent);
    expect(moreDetailsLink[3]).toHaveAttribute('href', '/pokemons/25');
  });

  test('redirects to details page through click', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const headings = getAllByRole('heading');
    expect(headings[1].textContent).toBe('Pikachu Details');
    // console.log(headings[1].textContent);
  });

  test('if there is a star icon for favorites', () => {
    const { getByText, getByAltText, getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    userEvent.click(moreDetailsLink);
    userEvent.click(getByRole('checkbox'));
    const starImg = getByAltText(/marked as favorite/i);
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
