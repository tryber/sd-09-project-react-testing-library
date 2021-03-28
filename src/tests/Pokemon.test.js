import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Electric');
    const img = getByAltText('Pikachu sprite');
    const imgSrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toBe(imgSrc);
  });

  it('Testando o card do Pokémon se contém um link de navegação More Details', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: 'More details' });
    expect(moreDetailsButton).toBeInTheDocument();
    fireEvent.click(moreDetailsButton);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });

  it('Testa se ao clicar no link é renderizadodo o PokemonDetails', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByText('More details');
    expect(moreDetailsButton).toBeInTheDocument();

    fireEvent.click(moreDetailsButton);
    const textSummary = getByText('Summary');
    expect(textSummary).toBeInTheDocument();

    const buttonFavorite = getByText('Pokémon favoritado?');
    expect(buttonFavorite).toBeInTheDocument();

    fireEvent.click(buttonFavorite);
    const pokemonAlt = getByAltText('Pikachu is marked as favorite');
    expect(pokemonAlt).toBeInTheDocument();
    expect(pokemonAlt.src).toBe('http://localhost/star-icon.svg');
  });
});
