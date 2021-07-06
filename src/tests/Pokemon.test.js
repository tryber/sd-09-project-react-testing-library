import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('testing Pokemon.js', () => {
  it('testing whether the pokemon card is rendered', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.textContent).toBe('Pikachu');

    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.textContent).toBe('Electric');

    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');

    const pokeImage = getByAltText(/sprite/);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('test if the Pokémon card contains a navigation link', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/pokemons/25' });

    const pikachu = getByTestId('pokemon-name');
    expect(pikachu.textContent).toBe('Pikachu');
  });

  it('test if clicking on the Pokémon details link redirects to details page.', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    fireEvent.click(detailsLink);
    const textPageDetails = getByText(/Summary/i);
    expect(textPageDetails).toBeInTheDocument();
  });

  it('test if there is a star icon on favorite Pokémon.', async () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));

    const starImage = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
    expect(starImage.alt).toBe('Pikachu is marked as favorite');
  });
});
