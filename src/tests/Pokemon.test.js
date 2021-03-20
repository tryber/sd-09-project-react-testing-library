import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 06, testing the Pokemon.js component', () => {
  it('has one star icon when the Pokémon is favorited', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsCard = getByText('More details');
    fireEvent.click(moreDetailsCard);

    const favoriteButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteButton);

    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    // ** Source: https://github.com/tryber/sd-09-project-react-testing-library/pull/45/files */
  });
  it('has an card with pokémon info', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonImage = getByAltText(`${pokemonName.textContent} sprite`);
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const cardInformation = {
      name: pokemonName,
      type: pokemonType,
      weight: pokemonWeight,
      image: pokemonImage,
    };
    Object.values(cardInformation)
      .forEach((cardInfo) => expect(cardInfo).toBeInTheDocument());
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('has a navigation link to show details', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
