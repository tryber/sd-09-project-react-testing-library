import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 6, testa Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe('Pikachu');

    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.textContent).toBe('Electric');

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.textContent).toBe('Average weight: 6.0 kg');

    const image = getByAltText('Pikachu sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('ao clicar botão de detalhes, redireciona para página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const detailsButton = getByText('More details');
    expect(detailsButton).toBeInTheDocument();
    fireEvent.click(detailsButton);
    expect(getByText('Summary')).toBeInTheDocument();
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const detailsButton = getByText('More details');
    expect(detailsButton).toBeInTheDocument();
    fireEvent.click(detailsButton);

    const favPokeButton = getByText('Pokémon favoritado?');
    expect(favPokeButton).toBeInTheDocument();
    fireEvent.click(favPokeButton);

    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
