import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// realizado requisito com ajuda da cainan
// https://github.com/tryber/sd-08-project-react-testing-library/blob/Cainan6697-react-testing/src/tests/Pokemon.test.js

describe('Pokemon', () => {
  it('information shown by the card is correct', () => {
    const { getByTestId, getByAltText, getByText, history } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const image = getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toBeInTheDocument();
    expect(image).not.toHaveAttribute('src', '');

    const moreDetails = getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);
    history.push('/');
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
