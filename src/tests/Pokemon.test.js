import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa os pokemons', () => {
  it('testa card - nome - tipo - peso - detalhes - imagem', () => {
    // access
    const { getByTestId, getByText, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonKG = getByTestId('pokemon-weight');
    const pokemonDetails = getByText('More details');
    const pokemonImg = getByAltText(`${pokemonName.textContent} sprite`);

    // test
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonKG.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonDetails.getAttribute('href')).toBe('/pokemons/25');
    expect(pokemonImg.getAttribute('src')).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('entra em detalhe - confere o icone de estrela , e checkbox favorite', () => {
    // access
    const {
      getByTestId, getByText, getByLabelText, getByAltText,
    } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const detalhesLink = getByText('More details');

    // interact
    fireEvent.click(detalhesLink);

    // access in More details
    const pokemonFav = getByLabelText('Pokémon favoritado?');

    // interact
    fireEvent.click(pokemonFav);

    // access in More details
    const starIcon = getByAltText(`${pokemonName.textContent} is marked as favorite`);

    // test
    expect(starIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
