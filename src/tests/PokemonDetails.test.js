import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the `<PokemonDetails />` component', () => {
  it('detailed information about the selected Pokémon is shown on the screen', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    expect(getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    expect(moreDetailsButton).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    const summaryText = getByText(/roasts hard berries with electricity to make them/i);
    expect(summaryText).toBeInTheDocument();
  });

  it('theres a section on the page with maps containing locations of the pokémon', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    const locationsHeading = getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locationsHeading).toBeInTheDocument();
    expect(getByText(/kanto viridian forest/i)).toBeInTheDocument();
    const mapImages = getAllByRole('img');
    expect(mapImages[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImages[1].alt).toBe('Pikachu location');
  });

  it('the user can favor a pokémon through the details page', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText(/more details/i));
    expect(getByText(/pokémon favoritado\?/i)).toBeInTheDocument();
    const favoriteCheckbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteCheckbox).not.toBeChecked();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
  });
});
