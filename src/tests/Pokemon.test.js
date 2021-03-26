import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Pokemon component', () => {
  test('Render a card with pokemon info', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent(/Pikachu/);
    expect(pokemonType).toHaveTextContent(/Electric/);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/);
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Render a link on the Pokemon card to show more details', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Redirects to Pokemon detail after clicking on `more details`', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    const heading2 = screen.getByRole('heading', { level: 2, name: /Pikachu Details/ });

    expect(heading2).toBeInTheDocument();
  });

  test('Renders a star icon on favorited pokemons', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox', { checked: false });

    userEvent.click(favoriteCheckbox);

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('http://localhost/star-icon.svg');
  });
});
