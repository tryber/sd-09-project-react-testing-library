import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Check component pokemon card', () => {
  // Verificar informações de nome, tipo, peso e imagem
  it('Check information name, type, weight and image', () => {
    const charmander = pokemons[1];
    const { queryByTestId, getByAltText } = renderRouter(<Pokemon
      pokemon={ charmander }
    />);
    const checkNamePokemon = queryByTestId('pokemon-name');
    expect(checkNamePokemon).toHaveTextContent('Charmander');

    const CheckTypePokemon = queryByTestId('pokemonType');
    expect(CheckTypePokemon).toHaveTextContent('Fire');

    const checkWeightPokemon = queryByTestId('pokemon-weight');
    expect(checkWeightPokemon).toHaveTextContent('Average weight: 8.5 kg');

    const imagegAlt = getByAltText(/Charmander sprite/i);
    expect(imagegAlt.src).toBe('https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  // Verifica se contem um link de navegação
  it('Check if it contains a navigation link', () => {
    const charmander = pokemons[1];
    const { getByText } = renderRouter(<Pokemon pokemon={ charmander } />);

    const checkMoreDetails = getByText('More details');
    expect(checkMoreDetails.href).toContain('/pokemons/4');
  });
  // Verifica se o link está funcionando
  it('Checks whether the link is working', () => {
    const checkPokemon = pokemons[1];
    const { getByText, history } = renderRouter(<Pokemon pokemon={ checkPokemon } />);

    const checkMoreDetails = getByText('More details');
    expect(checkMoreDetails).toBeInTheDocument();

    fireEvent.click(checkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/4');
  });
  // Verificar se existe icone de estrela nos pokemons favoritos
  it('Check if there is a star icon in favorite pokemons', () => {
    const charmander = pokemons[1];
    const { getByAltText } = renderRouter(<Pokemon
      pokemon={ charmander }
      isFavorite
    />);

    const starIcon = getByAltText('Charmander is marked as favorite');
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
